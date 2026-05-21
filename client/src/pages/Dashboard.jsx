import DataTable from "@/components/DataTable";
import React, { useState } from "react";
import { TrendingUp, TrendingDown, BarChart2, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PERIODS = ["1D", "1W", "1M", "3M", "6M", "1Y", "Max"];

// Simulated BTC price data per period
const chartData = {
  "1D": [
    { time: "00:00", price: 88100 },
    { time: "02:00", price: 87900 },
    { time: "04:00", price: 88400 },
    { time: "06:00", price: 88050 },
    { time: "08:00", price: 88900 },
    { time: "10:00", price: 89200 },
    { time: "12:00", price: 89800 },
    { time: "14:00", price: 89500 },
    { time: "16:00", price: 90100 },
    { time: "18:00", price: 89700 },
    { time: "20:00", price: 89900 },
    { time: "22:00", price: 89620 },
  ],
  "1W": [
    { time: "Mon", price: 85200 },
    { time: "Tue", price: 86500 },
    { time: "Wed", price: 85900 },
    { time: "Thu", price: 87300 },
    { time: "Fri", price: 88100 },
    { time: "Sat", price: 88800 },
    { time: "Sun", price: 89620 },
  ],
  "1M": [
    { time: "Apr 22", price: 82400 },
    { time: "Apr 26", price: 83900 },
    { time: "Apr 30", price: 84200 },
    { time: "May 04", price: 85700 },
    { time: "May 08", price: 86100 },
    { time: "May 12", price: 87400 },
    { time: "May 16", price: 88200 },
    { time: "May 21", price: 89620 },
  ],
  "3M": [
    { time: "Feb", price: 76000 },
    { time: "Mar", price: 79400 },
    { time: "Apr", price: 82500 },
    { time: "May", price: 89620 },
  ],
  "6M": [
    { time: "Nov", price: 68000 },
    { time: "Dec", price: 71500 },
    { time: "Jan", price: 75000 },
    { time: "Feb", price: 76000 },
    { time: "Mar", price: 80000 },
    { time: "Apr", price: 84000 },
    { time: "May", price: 89620 },
  ],
  "1Y": [
    { time: "Jun'24", price: 62000 },
    { time: "Aug'24", price: 58000 },
    { time: "Oct'24", price: 67000 },
    { time: "Dec'24", price: 94000 },
    { time: "Feb'25", price: 76000 },
    { time: "Apr'25", price: 84000 },
    { time: "May'25", price: 89620 },
  ],
  "Max": [
    { time: "2020", price: 28000 },
    { time: "2021", price: 64000 },
    { time: "2022", price: 16000 },
    { time: "2023", price: 42000 },
    { time: "2024", price: 94000 },
    { time: "2025", price: 89620 },
  ],
};

const categories = [
  {
    name: "Smart Contract Platform",
    change: "+1.52%",
    positive: true,
    marketCap: "$2.54T",
    volume: "$70.48B",
    coins: ["₿", "◆", "B"],
    coinColors: ["#f97316", "#64748b", "#eab308"],
  },
  {
    name: "Layer 1",
    change: "+1.50%",
    positive: true,
    marketCap: "$2.49T",
    volume: "$73.30B",
    coins: ["₿", "◆", "B"],
    coinColors: ["#f97316", "#64748b", "#eab308"],
  },
  {
    name: "DeFi",
    change: "-0.82%",
    positive: false,
    marketCap: "$134.22B",
    volume: "$9.12B",
    coins: ["U", "A", "M"],
    coinColors: ["#3b82f6", "#8b5cf6", "#10b981"],
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(15,25,32,0.97)",
        border: "1px solid rgba(163,230,53,0.2)",
        borderRadius: 10,
        padding: "8px 14px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <p style={{ fontSize: 11, color: "rgba(148,168,184,0.7)", marginBottom: 2 }}>{label}</p>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: "#e8f0f4",
          margin: 0,
        }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState("1D");
  const data = chartData[activePeriod];
  const first = data[0].price;
  const last = data[data.length - 1].price;
  const pctChange = (((last - first) / first) * 100).toFixed(2);
  const isPositive = last >= first;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@500;600&display=swap');

        .db-root {
          --accent: #a3e635;
          --accent-dim: rgba(163,230,53,0.1);
          --accent-border: rgba(163,230,53,0.2);
          --surface-raised: rgba(20,32,40,0.95);
          --border: rgba(255,255,255,0.07);
          --border-hover: rgba(255,255,255,0.12);
          --text: #e8f0f4;
          --muted: rgba(148,168,184,0.7);
          --hint: rgba(100,130,148,0.5);
          --neg: #f87171;
          --neg-dim: rgba(248,113,113,0.1);
          --neg-border: rgba(248,113,113,0.2);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #060e12;
          padding: 28px 20px;
        }

        .db-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

        .db-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
        }

        .db-stat {
          background: var(--surface-raised);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 16px;
          transition: border-color 0.2s;
        }
        .db-stat:hover { border-color: var(--border-hover); }

        .db-stat-label {
          font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
          display: flex; align-items: center; gap: 5px;
        }
        .db-stat-val { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; }
        .db-stat-sub { font-size: 11px; margin-top: 3px; color: var(--muted); }

        .db-top { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 960px) { .db-top { grid-template-columns: 3fr 2fr; } }

        .db-card {
          background: var(--surface-raised);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: border-color 0.25s;
        }
        .db-card:hover { border-color: var(--border-hover); }

        .db-card-head { padding: 18px 20px 14px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }

        .db-coin-info { display: flex; align-items: center; gap: 12px; }

        .db-coin-avatar {
          width: 44px; height: 44px; border-radius: 12px; overflow: hidden;
          border: 1px solid var(--border); background: rgba(255,255,255,0.04); flex-shrink: 0;
        }
        .db-coin-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .db-coin-ticker { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
        .db-coin-price { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; line-height: 1; }

        .db-coin-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; font-weight: 600;
          border-radius: 8px; padding: 3px 8px; margin-top: 4px;
        }
        .db-coin-badge.pos { color: #a3e635; background: var(--accent-dim); border: 1px solid var(--accent-border); }
        .db-coin-badge.neg { color: var(--neg); background: var(--neg-dim); border: 1px solid var(--neg-border); }

        .db-periods {
          display: flex; align-items: center; gap: 2px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border); border-radius: 10px; padding: 3px;
          flex-shrink: 0;
        }
        .db-period-btn {
          background: transparent; border: none; color: var(--muted);
          font-size: 12px; font-weight: 500; padding: 5px 9px; border-radius: 7px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .db-period-btn:hover { color: var(--text); background: rgba(255,255,255,0.05); }
        .db-period-btn.active { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-border); }

        .db-chart-wrap { padding: 0 16px 18px; height: 300px; }

        .db-section-title { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; color: var(--text); letter-spacing: -0.2px; }

        .db-trend-head { padding: 18px 20px 12px; display: flex; align-items: center; justify-content: space-between; }

        .db-badge-live {
          display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 500;
          color: var(--accent); background: var(--accent-dim); border: 1px solid var(--accent-border);
          border-radius: 6px; padding: 3px 8px;
        }
        .db-live-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--accent);
          animation: db-pulse 1.8s ease-in-out infinite;
        }
        @keyframes db-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .db-cat-card { background: var(--surface-raised); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; }
        .db-cat-head { padding: 18px 20px 12px; display: flex; align-items: center; justify-content: space-between; }

        .db-cat-cols {
          display: grid; grid-template-columns: 2fr 1.5fr 1fr 1.5fr 1.5fr;
          padding: 8px 20px; font-size: 11px; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--hint);
          border-top: 1px solid var(--border); background: rgba(255,255,255,0.02);
        }
        .db-cat-row {
          display: grid; grid-template-columns: 2fr 1.5fr 1fr 1.5fr 1.5fr;
          padding: 14px 20px; font-size: 13.5px; color: var(--text);
          border-top: 1px solid var(--border); align-items: center; transition: background 0.2s;
        }
        .db-cat-row:hover { background: rgba(255,255,255,0.025); }
        .db-cat-name { font-weight: 500; font-size: 13px; }

        .db-coin-stack { display: flex; align-items: center; }
        .db-coin-chip {
          width: 24px; height: 24px; border-radius: 50%; display: flex;
          align-items: center; justify-content: center; font-size: 10px; font-weight: 700;
          border: 1.5px solid #060e12; margin-right: -6px; color: white;
        }

        .db-change-pos { display: inline-flex; align-items: center; gap: 3px; color: #a3e635; font-size: 13px; font-weight: 600; }
        .db-change-neg { display: inline-flex; align-items: center; gap: 3px; color: var(--neg); font-size: 13px; font-weight: 600; }
        .db-fig { font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }

        @media (max-width: 700px) {
          .db-cat-cols, .db-cat-row { grid-template-columns: 2fr 1.4fr 1fr; }
          .db-col-hide { display: none; }
          .db-periods { display: none; }
          .db-chart-wrap { height: 220px; }
        }
      `}</style>

      <div className="db-root">
        <div className="db-inner">

          {/* Stat bar */}
          <div className="db-stats">
            {[
              { label: "Market Cap", icon: <BarChart2 size={11} />, val: "$2.81T", sub: "+1.2% today" },
              { label: "24h Volume", icon: <Activity size={11} />, val: "$94.3B", sub: "Across all assets" },
              { label: "BTC Dominance", icon: null, val: "52.4%", sub: "Bitcoin share" },
              { label: "Active Coins", icon: null, val: "13,482", sub: "Listed globally" },
            ].map((s) => (
              <div className="db-stat" key={s.label}>
                <div className="db-stat-label">{s.icon}{s.label}</div>
                <div className="db-stat-val">{s.val}</div>
                <div className="db-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Top section */}
          <div className="db-top">

            {/* Chart card */}
            <div className="db-card">
              <div className="db-card-head">
                <div className="db-coin-info">
                  <div className="db-coin-avatar">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Wc2ngWH2gFD2i-BEu_-lJ_AK898stGl-MQ&s" alt="Bitcoin" />
                  </div>
                  <div>
                    <div className="db-coin-ticker">Bitcoin · BTC</div>
                    <div className="db-coin-price">$89,620</div>
                    <div className={`db-coin-badge ${isPositive ? "pos" : "neg"}`}>
                      {isPositive
                        ? <TrendingUp size={11} strokeWidth={2.5} />
                        : <TrendingDown size={11} strokeWidth={2.5} />}
                      {isPositive ? "+" : ""}{pctChange}%
                    </div>
                  </div>
                </div>
                <div className="db-periods">
                  {PERIODS.map((p) => (
                    <button
                      key={p}
                      className={`db-period-btn ${activePeriod === p ? "active" : ""}`}
                      onClick={() => setActivePeriod(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recharts area chart */}
              <div className="db-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a3e635" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(255,255,255,0.04)"
                      strokeDasharray="0"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "rgba(100,130,148,0.6)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
                      axisLine={false}
                      tickLine={false}
                      dy={6}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
                      tick={{ fill: "rgba(100,130,148,0.6)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                      width={44}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(163,230,53,0.2)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#a3e635"
                      strokeWidth={2}
                      fill="url(#btcGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#a3e635", stroke: "#060e12", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Trending card */}
            <div className="db-card">
              <div className="db-trend-head">
                <span className="db-section-title">Trending coins</span>
                <div className="db-badge-live">
                  <span className="db-live-dot" />
                  Live
                </div>
              </div>
              <DataTable />
            </div>
          </div>

          {/* Categories */}
          <div className="db-cat-card">
            <div className="db-cat-head">
              <span className="db-section-title">Top categories</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Updated 2 min ago</span>
            </div>

            <div className="db-cat-cols">
              <span>Category</span>
              <span>Top gainers</span>
              <span>24h</span>
              <span className="db-col-hide">Market cap</span>
              <span className="db-col-hide">Volume</span>
            </div>

            {categories.map((cat) => (
              <div className="db-cat-row" key={cat.name}>
                <span className="db-cat-name">{cat.name}</span>
                <div className="db-coin-stack">
                  {cat.coins.map((c, i) => (
                    <span key={i} className="db-coin-chip" style={{ background: cat.coinColors[i], zIndex: 3 - i }}>
                      {c}
                    </span>
                  ))}
                </div>
                <span className={cat.positive ? "db-change-pos" : "db-change-neg"}>
                  {cat.positive ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
                  {cat.change}
                </span>
                <span className="db-fig db-col-hide">{cat.marketCap}</span>
                <span className="db-fig db-col-hide">{cat.volume}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;