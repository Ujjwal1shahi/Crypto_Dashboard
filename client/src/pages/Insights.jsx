import React, { useEffect, useState } from "react";
import { getTrendingCoins } from "@/lib/api";

const Insights = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTrendingCoins();
        setTrending(data.coins || []);
      } catch (err) {
        setError(err.message || "Failed to load insights");
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-6">
        <h2 className="text-2xl font-bold text-white">Insights</h2>
        <p className="mt-1 text-sm text-[#6D7382]">Trending coin insights from CoinGecko search data.</p>
      </div>

      {error && <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">{error}</div>}
      {loading && <p className="text-[#6D7382]">Loading insights...</p>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trending.map(({ item }) => (
          <div key={item.id} className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-5">
            <div className="flex items-center gap-3">
              <img src={item.large} alt={item.name} className="h-12 w-12 rounded-full" />
              <div>
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-xs uppercase text-[#6D7382]">{item.symbol}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#060606] p-3">
                <p className="text-xs text-[#6D7382]">Market rank</p>
                <p className="mt-1 font-bold text-white">#{item.market_cap_rank || "-"}</p>
              </div>
              <div className="rounded-2xl bg-[#060606] p-3">
                <p className="text-xs text-[#6D7382]">Score</p>
                <p className="mt-1 font-bold text-[#B4A9E6]">{item.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insights;
