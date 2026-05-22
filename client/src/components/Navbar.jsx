import React from "react";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#343546]/50 bg-[#060606]/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="rounded-2xl border border-[#343546] bg-[#121212] p-3 text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#6D7382]">Overview</p>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Crypto Dashboard</h2>
          </div>
        </div>

        <div className="hidden w-full max-w-md items-center gap-3 rounded-2xl border border-[#343546] bg-[#121212] px-4 py-3 md:flex">
          <Search className="h-5 w-5 text-[#6D7382]" />
          <input
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#6D7382]"
            placeholder="Search coins, markets..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-2xl border border-[#343546] bg-[#121212] p-3 text-white sm:block" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-[#343546] bg-[#121212] px-3 py-2 md:flex">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#242424] text-sm font-bold text-[#B4A9E6]">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="max-w-36">
              <p className="truncate text-sm font-semibold text-white">{user?.name || "User"}</p>
              <p className="truncate text-xs text-[#6D7382]">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border border-[#343546] bg-[#121212] p-3 text-white transition hover:border-[#B4A9E6]/60 hover:text-[#B4A9E6]"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
