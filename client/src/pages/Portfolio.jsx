import React, { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, getMarketCoins } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const Portfolio = () => {
  const { user } = useAuth();
  const storageKey = `crypto_portfolio_${user?._id || "guest"}`;
  const [coins, setCoins] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedHoldings = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setHoldings(Array.isArray(savedHoldings) ? savedHoldings : []);
    } catch (_error) {
      setHoldings([]);
    }
  }, [storageKey]);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMarketCoins(100);
        setCoins(data);
        if (data?.[0]?.id) setSelectedCoin(data[0].id);
      } catch (err) {
        setError(err.message || "Failed to load coins");
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(holdings));
  }, [holdings, storageKey]);

  const rows = holdings.map((holding) => {
    const coin = coins.find((item) => item.id === holding.id);
    return {
      ...holding,
      coin,
      value: (coin?.current_price || 0) * Number(holding.amount || 0),
    };
  });

  const total = useMemo(() => rows.reduce((sum, row) => sum + row.value, 0), [rows]);

  const handleAddHolding = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!selectedCoin || !numericAmount || numericAmount <= 0) return;

    setHoldings((prev) => {
      const exists = prev.find((item) => item.id === selectedCoin);
      if (exists) {
        return prev.map((item) =>
          item.id === selectedCoin ? { ...item, amount: Number(item.amount) + numericAmount } : item
        );
      }
      return [...prev, { id: selectedCoin, amount: numericAmount }];
    });

    setAmount("");
  };

  const handleRemoveHolding = (coinId) => {
    setHoldings((prev) => prev.filter((item) => item.id !== coinId));
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-6">
          <p className="text-sm text-[#6D7382]">Your portfolio value</p>
          <h2 className="mt-3 text-4xl font-bold text-white">{formatCurrency(total)}</h2>
          <p className="mt-2 text-sm text-[#6D7382]">Holdings are saved locally for your logged-in account.</p>
        </div>

        <form onSubmit={handleAddHolding} className="rounded-3xl border border-[#343546]/70 bg-[#121212] p-6">
          <h3 className="text-lg font-bold text-white">Add holding</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_auto]">
            <select
              value={selectedCoin}
              onChange={(event) => setSelectedCoin(event.target.value)}
              className="rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3 text-sm text-white outline-none"
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol?.toUpperCase()})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount"
              className="rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3 text-sm text-white outline-none placeholder:text-[#6D7382]"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#B4A9E6] px-5 py-3 font-bold text-[#060606] transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </form>
      </div>

      {error && <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">{error}</div>}

      <div className="rounded-3xl border border-[#343546]/70 bg-[#121212]">
        <div className="border-b border-[#343546]/60 p-5">
          <h3 className="text-lg font-bold text-white">Holdings</h3>
          <p className="mt-1 text-sm text-[#6D7382]">Values update from live CoinGecko prices through your backend.</p>
        </div>

        {loading ? (
          <div className="p-6 text-[#6D7382]">Loading portfolio...</div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-[#6D7382]">No holdings yet. Add your first coin above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-[#060606] text-xs uppercase tracking-wider text-[#6D7382]">
                <tr>
                  <th className="px-5 py-4">Coin</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Value</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#343546]/50">
                {rows.map(({ id, amount: holdingAmount, coin, value }) => (
                  <tr key={id} className="hover:bg-[#242424]/60">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {coin?.image && <img src={coin.image} alt={coin.name} className="h-9 w-9 rounded-full" />}
                        <div>
                          <p className="font-semibold text-white">{coin?.name || id}</p>
                          <p className="text-xs uppercase text-[#6D7382]">{coin?.symbol || id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#D8D8D8]">{holdingAmount}</td>
                    <td className="px-5 py-4 text-[#D8D8D8]">{formatCurrency(coin?.current_price)}</td>
                    <td className="px-5 py-4 font-bold text-[#B4A9E6]">{formatCurrency(value)}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleRemoveHolding(id)}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20"
                        aria-label={`Remove ${id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
