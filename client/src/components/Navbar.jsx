import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Coins,
  LineChart,
  Wallet,
  Newspaper,
  Search,
  Bell,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Markets", path: "/markets", icon: Coins },
    { name: "Portfolio", path: "/portfolio", icon: Wallet },
    { name: "Charts", path: "/charts", icon: LineChart },
    { name: "News", path: "/news", icon: Newspaper },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#071112]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#151c22] shadow-lg shadow-black/30 ring-1 ring-white/10">
            <Coins className="h-6 w-6 text-lime-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">
              Coin<span className="text-lime-400">Pulse</span>
            </h1>
            <p className="-mt-1 text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Crypto Dashboard
            </p>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#1d2a35] text-lime-400 shadow-inner shadow-black/30"
                      : "text-slate-300 hover:bg-[#151c22] hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#151c22] px-3 py-2 text-slate-400">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search coin..."
              className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 lg:w-44"
            />
          </div>

          <button className="relative rounded-full border border-white/10 bg-[#151c22] p-2 text-slate-300 transition hover:bg-[#1d2a35] hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime-400"></span>
          </button>

          <button className="rounded-full bg-lime-400 px-5 py-2 text-sm font-bold text-black shadow-lg shadow-lime-400/20 transition hover:scale-105 hover:bg-lime-300 hover:shadow-lime-400/40">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-white/10 bg-[#151c22] p-2 text-white transition hover:bg-[#1d2a35] lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#071112] px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#151c22] px-3 py-2 text-slate-400">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search coin..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#1d2a35] text-lime-400"
                        : "text-slate-300 hover:bg-[#151c22] hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          <button className="mt-4 w-full rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-lime-400/20 transition hover:bg-lime-300">
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;