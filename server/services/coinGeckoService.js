const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3";
const cache = new Map();

const getCacheKey = (endpoint, query) => `${endpoint}?${new URLSearchParams(query).toString()}`;

const getCoinGeckoHeaders = () => {
    const headers = { accept: "application/json" };
    const apikey = process.env.COINGECKO_API_KEY;

    if(apikey){
        const keyType = (process.env.COINGECKO_API_KEY_TYPE || "demo").toLowerCase();
        headers[keyType === "pro" ? "x-cg-pro-api-key" : "x-cg-demo-api-key"] = apikey;
    }

    return headers;
};

const requestCoinGecko = async (endpoint, query = {}, ttlMs = 60_000) => {
    const cacheKey = getCacheKey(endpoint, query);
    const cached = cache.get(cacheKey);

    if(cache && cached.expiresAt > Date.now()){
        return cached.data;
    }

    const params = new URLSearchParams(query);
    const url = `${COINGECKO_BASE_URL}${endpoint}${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await fetch(url, {headers: getCoinGeckoHeaders()});

    const data = await response.json().catch(() => ({}));

    if(!response.ok){
        const message = data?.error || data?.status?.error_message || "CoinGecko request failed";

        const error = new Error(message);
        error.statusCode = response.status;
        throw error;
    }

    cache.set(cacheKey, { data, expiresAt: Date.now() + ttlMs });
    return data;
};