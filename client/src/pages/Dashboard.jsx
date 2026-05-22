import React, { useEffect, useMemo, useState } from "react";
import { Activity, BarChart3, Coins, DollarSign } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CoinTable from "@/components/CoinTable";
import StatCard from "@/components/StatCard";
import { formatCurrency, formatNumber, getGlobalMarket, getMarketCoins, getTrendingCoins } from "@/lib/api";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [global, setGlobal] = useState(null);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [coinData, globalData, trendingData] = await Promise.all([
          getMarketCoins(20),
          getGlobalMarket(),
          getTrendingCoins(),
        ]);

        setCoins(coinData);
        setGlobal(globalData.data);
        setTrending(trendingData.coins?.slice(0, 5) || []);
      } catch (err) {
        setError(err.message || "Failed to load crypto data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const btc = coins[0];

  const chartData = useMemo(() => {
    return (btc?.sparkline_in_7d?.price || []).slice(-40).map((price, index) => ({
      time: index,
      price: Number(price.toFixed(2)),
    }));
  }, [btc]);

  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center text-[#6D7382]">Loading CoinGecko data...</div>;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Market Cap"
          value={formatCurrency(global?.total_market_cap?.usd, 1)}
          subtitle="Global crypto market"
          icon={DollarSign}
        />
        <StatCard
          title="24h Volume"
          value={formatCurrency(global?.total_volume?.usd, 1)}
          subtitle="All exchanges volume"
          icon={BarChart3}
        />
        <StatCard
          title="Active Coins"
          value={formatNumber(global?.active_cryptocurrencies)}
          subtitle="Tracked by CoinGecko"
          icon={Coins}
        />
        <StatCard
          title="BTC Dominance"
          value={`${global?.market_cap_percentage?.btc?.toFixed(2) || 0}%`}
          subtitle="Bitcoin market share"
          icon={Activity}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-5 shadow-xl shadow-black/20">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-[#6D7382]">Bitcoin 7 day sparkline</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{formatCurrency(btc?.current_price)}</h3>
            </div>
            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                btc?.price_change_percentage_24h >= 0
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-red-400/10 text-red-400"
              }`}
            >
              {btc?.price_change_percentage_24h >= 0 ? "+" : ""}
              {btc?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B4A9E6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#B4A9E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Tooltip
                  contentStyle={{
                    background: "#060606",
                    border: "1px solid #343546",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                  formatter={(value) => [formatCurrency(value), "Price"]}
                  labelFormatter={() => ""}
                />
                <Area type="monotone" dataKey="price" stroke="#B4A9E6" strokeWidth={3} fill="url(#price)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-5 shadow-xl shadow-black/20">
          <h3 className="text-lg font-bold text-white">Trending Coins</h3>
          <p className="mt-1 text-sm text-[#6D7382]">Most searched on CoinGecko</p>

          <div className="mt-5 space-y-3">
            {trending.map(({ item }) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[#060606] p-3">
                <div className="flex items-center gap-3">
                  <img src={item.small} alt={item.name} className="h-9 w-9 rounded-full" />
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs uppercase text-[#6D7382]">{item.symbol}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#242424] px-3 py-1 text-xs text-[#B4A9E6]">
                  #{item.market_cap_rank || "-"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CoinTable coins={coins} />
    </section>
  );
};

export default Dashboard;
