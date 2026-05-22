import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, getCoinChart } from "@/lib/api";

const coinOptions = ["bitcoin", "ethereum", "solana", "ripple", "cardano"];
const dayOptions = [1, 7, 30, 90, 365];

const Charts = () => {
  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(7);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadChart = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCoinChart(coin, days);
        setPrices(data.prices || []);
      } catch (err) {
        setError(err.message || "Failed to load chart");
        setPrices([]);
      } finally {
        setLoading(false);
      }
    };

    loadChart();
  }, [coin, days]);

  const chartData = useMemo(
    () =>
      prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: Number(price.toFixed(2)),
      })),
    [prices]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Charts</h2>
            <p className="mt-1 text-sm text-[#6D7382]">Historical price chart from CoinGecko.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3 text-sm text-white outline-none"
            >
              {coinOptions.map((item) => (
                <option key={item} value={item}>{item.toUpperCase()}</option>
              ))}
            </select>

            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3 text-sm text-white outline-none"
            >
              {dayOptions.map((item) => (
                <option key={item} value={item}>{item}D</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div>}

        <div className="mt-8 h-[430px]">
          {loading ? (
            <div className="grid h-full place-items-center text-[#6D7382]">Loading chart...</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartPagePrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B4A9E6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#B4A9E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6D7382" tickLine={false} axisLine={false} />
                <YAxis stroke="#6D7382" tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value, 0)} />
                <Tooltip
                  contentStyle={{
                    background: "#060606",
                    border: "1px solid #343546",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                  formatter={(value) => [formatCurrency(value), "Price"]}
                />
                <Area type="monotone" dataKey="price" stroke="#B4A9E6" strokeWidth={3} fill="url(#chartPagePrice)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default Charts;
