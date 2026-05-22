import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  Newspaper,
  PieChart,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Markets", path: "/markets", icon: TrendingUp },
  { name: "Portfolio", path: "/portfolio", icon: Wallet },
  { name: "Charts", path: "/charts", icon: LineChart },
  { name: "Insights", path: "/insights", icon: Newspaper },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-[#343546]/60 bg-[#060606] transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-[#343546]/50 px-5">
            <NavLink to="/" onClick={onClose} className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#434546] shadow-lg shadow-black/30">
                <PieChart className="h-5 w-5 text-[#B4A9E6]" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white">CryptoDash</h1>
                <p className="text-xs text-[#6D7382]">CoinGecko Market</p>
              </div>
            </NavLink>

            <button
              onClick={onClose}
              className="rounded-xl border border-[#343546] p-2 text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {links.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#242424] text-white shadow-lg shadow-black/20"
                      : "text-[#6D7382] hover:bg-[#121212] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-xl transition ${
                        isActive ? "bg-[#B4A9E6] text-[#060606]" : "bg-[#121212] text-[#6D7382] group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="m-4 rounded-3xl border border-[#343546]/70 bg-[#121212] p-4">
            <p className="text-sm font-semibold text-white">Live market data</p>
            <p className="mt-1 text-xs leading-5 text-[#6D7382]">
              Prices, charts, trending coins and market stats are fetched from CoinGecko.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
