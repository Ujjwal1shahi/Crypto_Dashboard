import DataTable from "@/components/DataTable";
import React from "react";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#071112] px-4 py-6 text-white sm:px-6 lg:px-10 xl:px-20">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Top Section */}
        <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Coin Overview / Chart Card */}
          <div className="rounded-2xl bg-[#151c22] p-4 shadow-xl shadow-black/20">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Wc2ngWH2gFD2i-BEu_-lJ_AK898stGl-MQ&s"
                  alt="bitcoin"
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="leading-tight">
                  <p className="text-xs font-semibold text-slate-400">
                    Bitcoin / BTC
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    $89,620.00
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-3 text-xs font-semibold text-slate-400 sm:flex">
                <button className="rounded-lg bg-lime-400 px-3 py-2 text-black">
                  1D
                </button>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">
                  1W
                </button>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">
                  1M
                </button>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">
                  3M
                </button>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">
                  6M
                </button>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">
                  1Y
                </button>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">
                  Max
                </button>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="flex h-[260px] w-full items-center justify-center rounded-xl bg-[#0b1318] text-sm text-slate-500 sm:h-[320px]">
              Chart Area
            </div>
          </div>

          {/* Trending Coins Card */}
          <div className="overflow-hidden rounded-2xl bg-[#151c22] shadow-xl shadow-black/20">
            <h2 className="px-4 py-4 text-xl font-bold text-white">
              Trending Coins
            </h2>

            <DataTable />
          </div>
        </section>

        {/* Top Categories */}
        <section className="w-full overflow-hidden rounded-2xl bg-[#151c22] shadow-xl shadow-black/20">
          <h2 className="px-4 py-5 text-xl font-bold text-white">
            Top Categories
          </h2>

          <div className="grid grid-cols-5 bg-[#1d2a35] px-4 py-3 text-xs font-semibold text-slate-400 max-md:grid-cols-3">
            <p>Category</p>
            <p>Top Gainers</p>
            <p>24h Change</p>
            <p className="max-md:hidden">Market Cap</p>
            <p className="max-md:hidden">24h Volume</p>
          </div>

          <div className="grid grid-cols-5 items-center border-t border-white/5 px-4 py-4 text-sm text-white hover:bg-white/5 max-md:grid-cols-3">
            <p className="font-semibold">Smart Contract Platform</p>

            <div className="flex items-center gap-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold">
                ₿
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 text-xs font-bold">
                ◆
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold">
                B
              </span>
            </div>

            <p className="font-semibold text-lime-400">1.5% ↗</p>

            <p className="max-md:hidden">$2,542,503,470,411.12</p>
            <p className="max-md:hidden">$70,482,673,780.77</p>
          </div>

          <div className="grid grid-cols-5 items-center border-t border-white/5 px-4 py-4 text-sm text-white hover:bg-white/5 max-md:grid-cols-3">
            <p className="font-semibold">Layer 1</p>

            <div className="flex items-center gap-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold">
                ₿
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 text-xs font-bold">
                ◆
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold">
                B
              </span>
            </div>

            <p className="font-semibold text-lime-400">1.5% ↗</p>

            <p className="max-md:hidden">$2,492,099,439,059.87</p>
            <p className="max-md:hidden">$73,300,140,904.90</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;