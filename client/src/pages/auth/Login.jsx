import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, PieChart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-screen place-items-center bg-[#060606] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-[#343546]/70 bg-[#121212] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#434546]">
            <PieChart className="h-7 w-7 text-[#B4A9E6]" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-[#6D7382]">Login to view your crypto dashboard.</p>
        </div>

        {error && <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#D8D8D8]">Email</span>
            <div className="flex items-center gap-3 rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3">
              <Mail className="h-5 w-5 text-[#6D7382]" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#6D7382]"
                placeholder="you@example.com"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#D8D8D8]">Password</span>
            <div className="flex items-center gap-3 rounded-2xl border border-[#343546] bg-[#060606] px-4 py-3">
              <Lock className="h-5 w-5 text-[#6D7382]" />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#6D7382]"
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#B4A9E6] px-5 py-3 font-bold text-[#060606] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6D7382]">
          New here? <Link to="/signup" className="font-semibold text-[#B4A9E6]">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
