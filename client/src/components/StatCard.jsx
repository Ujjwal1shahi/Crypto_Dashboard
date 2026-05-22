import React from "react";

const StatCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-5 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#6D7382]">{title}</p>
          <h3 className="mt-3 text-2xl font-bold text-white">{value}</h3>
          <p className="mt-2 text-xs text-[#6D7382]">{subtitle}</p>
        </div>
        {Icon && (
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#242424] text-[#B4A9E6]">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
