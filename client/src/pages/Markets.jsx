import React, { useEffect, useState } from "react";
import CoinTable from "@/components/CoinTable";
import { getMarketCoins } from "@/lib/api";

const Markets = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMarketCoins(50);
        setCoins(data);
      } catch (err) {
        setError(err.message || "Failed to load markets");
      } finally {
        setLoading(false);
      }
    };

    loadMarkets();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    `${coin.name} ${coin.symbol}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#343546]/70 bg-[#121212] p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Markets</h2>
          <p className="mt-1 text-sm text-[#6D7382]">Search top coins by market cap.</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coin..."
          className="w-full rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3 text-sm text-white outline-none placeholder:text-[#6D7382] sm:max-w-xs"
        />
      </div>

      {error && <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">{error}</div>}
      {loading ? <p className="text-[#6D7382]">Loading markets...</p> : <CoinTable coins={filteredCoins} />}
    </section>
  );
};

export default Markets;
