import { requestCoinGecko } from "../services/coinGeckoService.js";


export const getTrending = async (_req, res, next) => {
    try {
        const data = await requestCoinGecko("/search/trending", {}, 120_000);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};