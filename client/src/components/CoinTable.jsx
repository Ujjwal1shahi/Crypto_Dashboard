import React from "react";
import { formatCurrency, formatNumber } from "@/lib/api";

const CoinTable = ({ coins = [] }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#343546]/70 bg-[#121212]">
      <div className="border-b border-[#343546]/60 p-5">
        <h3 className="text-lg font-bold text-white">Top Coins</h3>
        <p className="mt-1 text-sm text-[#6D7382]">Live market data from CoinGecko</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#060606] text-xs uppercase tracking-wider text-[#6D7382]">
            <tr>
              <th className="px-5 py-4">Coin</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">24h</th>
              <th className="px-5 py-4">Market Cap</th>
              <th className="px-5 py-4">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#343546]/50">
            {coins.map((coin) => {
              const isUp = coin.price_change_percentage_24h >= 0;
              return (
                <tr key={coin.id} className="hover:bg-[#242424]/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="h-9 w-9 rounded-full" />
                      <div>
                        <p className="font-semibold text-white">{coin.name}</p>
                        <p className="text-xs uppercase text-[#6D7382]">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-white">{formatCurrency(coin.current_price)}</td>
                  <td className={`px-5 py-4 font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                    {isUp ? "+" : ""}
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="px-5 py-4 text-[#D8D8D8]">{formatCurrency(coin.market_cap, 1)}</td>
                  <td className="px-5 py-4 text-[#D8D8D8]">{formatNumber(coin.total_volume)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;
