const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const TOKEN_KEY = "crypto_dashboard_token";
const USER_KEY = "crypto_dashboard_user";

// ==============================
// Local Storage Authentication
// ==============================

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch (_error) {
    return null;
  }
};

export const setStoredAuth = ({ token, user }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// ==============================
// Base API Request
// ==============================

const request = async (
  endpoint,
  { method = "GET", body, headers = {}, requiresAuth = true } = {}
) => {
  const token = getStoredToken();

  const requestHeaders = {
    accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(requiresAuth && token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body:
        body && typeof body !== "string"
          ? JSON.stringify(body)
          : body,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      if (response.status === 401 && requiresAuth) {
        clearStoredAuth();
      }

      throw new Error(
        data.message || "API request failed. Please try again."
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the server. Make sure your backend is running."
      );
    }

    throw error;
  }
};

// ==============================
// Authentication API
// Backend: /api/auth
// ==============================

export const signup = (payload) =>
  request("/auth/signup", {
    method: "POST",
    body: payload,
    requiresAuth: false,
  });

export const login = (payload) =>
  request("/auth/login", {
    method: "POST",
    body: payload,
    requiresAuth: false,
  });

export const getMe = () => request("/auth/me");

// ==============================
// Crypto Market API
// Backend: /api/markets
// ==============================

export const getMarketCoins = async ({
  limit = 20,
  page = 1,
  currency = "usd",
} = {}) => {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    vs_currency: currency,
    order: "market_cap_desc",
    sparkline: "true",
    price_change_percentage: "1h,24h,7d",
  });

  const response = await request(`/markets?${params.toString()}`);

  return response.data;
};

// ==============================
// Trending API
// Backend: /api/trending
// ==============================

export const getTrendingCoins = async () => {
  const response = await request("/trending");

  return response.data;
};

// ==============================
// Global Market API
// Backend: /api/global
// ==============================

export const getGlobalMarket = async () => {
  const response = await request("/global");

  return response.data;
};

// ==============================
// Chart API
// Backend: /api/charts/:coinId
// ==============================

export const getCoinChart = async (
  coinId = "bitcoin",
  days = 7,
  currency = "usd"
) => {
  const params = new URLSearchParams({
    days: String(days),
    vs_currency: currency,
  });

  const response = await request(
    `/charts/${encodeURIComponent(coinId)}?${params.toString()}`
  );

  return response.data;
};

// ==============================
// Formatting Helpers
// ==============================

export const formatCurrency = (value, maximumFractionDigits = 2) => {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: Math.abs(Number(value)) >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits,
  }).format(Number(value));
};

export const formatNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number(value));
};

export const cn = (...classes) => classes.filter(Boolean).join(" ");