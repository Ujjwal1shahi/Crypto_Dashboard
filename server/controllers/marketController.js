import { requestCoinGecko } from "../services/coinGeckoService.js";


export const getMarket = async (req, res, next) => {
    try{
        const limit = Math.min(Number(req.query.limit || req.query.per_page || 50), 100);

        const page = Math.max(Number(req.query.page || 1), 1);

        const data = await requestCoinGecko("/coins/markets", {
            vs_currency: req.query.vs_currency || "usd",
            order: req.query.order || "market_cap_desc",
            pre_page: String(limit),
            page: String(page),
            sparkline: req.query.sparkline || "true",
            price_change_parcentage: req.query.price_change_percentage || "1h,24h,7d",
        });
        res.status(200).json({ success: true, data });
    }
    catch (error){
        next(error);
    }
};