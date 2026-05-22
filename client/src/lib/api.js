const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "crypto_dashboard_token";
const USER_KEY = "crypto_dashboard_user";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch (_error) {
    return null;
  }
};

export const setStoredAuth = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const request = async (endpoint, options = {}) => {
  const token = getStoredToken();
  const headers = {
    accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: options.body && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    if (response.status === 401) clearStoredAuth();
    throw new Error(data.message || "API request failed. Please try again.");
  }

  return data;
};

export const signup = (payload) => request("/auth/signup", { method: "POST", body: payload });
export const login = (payload) => request("/auth/login", { method: "POST", body: payload });
export const getMe = () => request("/auth/me");

export const getMarketCoins = async (limit = 20) => {
  const response = await request(`/crypto/markets?limit=${limit}`);
  return response.data;
};

export const getTrendingCoins = async () => {
  const response = await request("/crypto/trending");
  return response.data;
};

export const getGlobalMarket = async () => {
  const response = await request("/crypto/global");
  return response.data;
};

export const getCoinChart = async (coinId = "bitcoin", days = 7) => {
  const response = await request(`/crypto/chart/${coinId}?days=${days}`);
  return response.data;
};

export const formatCurrency = (value, maximumFractionDigits = 2) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: Math.abs(value) >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits,
  }).format(value);
};

export const formatNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export const cn = (...classes) => classes.filter(Boolean).join(" ");
