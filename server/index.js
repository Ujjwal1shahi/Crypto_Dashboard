import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";


import authRoutes from "./routes/auth.js";
import marketRoutes from "./routes/marketRoutes.js";
import trendingRoutes from "./routes/trendingRoutes.js";
import globalRoutes from "./routes/globalRoutes.js";
import chartRoutes from "./routes/chartRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!MONGO_URL) {
  console.error("Missing MONGO_URL in server/.env");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in server/.env");
  process.exit(1);
}

app.set("trust proxy", 1);
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many auth requests. Try again later." },
});

// Rate limiting for CoinGecko-backed routes
const cryptoLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many crypto requests. Try again later.",
  },
});

// Health route
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Crypto dashboard API is running",
  });
});

// Authentication routes
app.use("/api/auth", authLimiter, authRoutes);

// Separate crypto routes
app.use("/api/markets", cryptoLimiter, marketRoutes);
app.use("/api/trending", cryptoLimiter, trendingRoutes);
app.use("/api/global", cryptoLimiter, globalRoutes);
app.use("/api/charts", cryptoLimiter, chartRoutes);

// Route not found
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error middleware
app.use((error, _req, res, _next) => {
  console.error(error);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

// Database connection and server start
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });