import { requestCoinGecko } from "../services/coinGeckoService.js";


export const  getGlobal = async (_req, res, next) => {
    try {
        const data = await requestCoinGecko("/global", {}, 120_00);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}