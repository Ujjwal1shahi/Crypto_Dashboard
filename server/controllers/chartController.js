import { requestCoinGecko } from "../services/coinGeckoService.js"


export const getChart = async (req, res, next) => {
    try {
        const coinId = req.params.coinId || "bitcoin";
        const days = req.query.days || "/";

        const data = await requestCoinGecko(`/coins/${encodeURIComponent(coinId)}/market_chart`, {
            vs_currency: req.query.vs_currency || "usd", days,
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};