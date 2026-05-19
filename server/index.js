import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import generalRoutes from "./routes/general.js";


/* CONFUGRATIONS */
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port, () => console.log(`Server is listening at https://localhost:${port}`));
})
.catch((error) => console.log(`${error} did not connect`));