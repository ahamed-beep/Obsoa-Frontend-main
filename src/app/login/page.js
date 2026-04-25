"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../Connection/axiosInstance";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-jomhuria text-white">Obsoa</h1>
          <p className="text-[#60BBEE] font-manrope text-sm mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-[#1e293b] rounded-2xl p-8 shadow-2xl border border-white/10">
          <h2 className="text-xl font-manrope font-semibold text-white mb-6">Sign in to continue</h2>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-manrope px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-manrope text-[#94a3b8] mb-2">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white font-manrope text-sm focus:outline-none focus:border-[#60BBEE] transition"
                placeholder="admin@obsoa.com"
              />
            </div>

            <div>
              <label className="block text-sm font-manrope text-[#94a3b8] mb-2">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white font-manrope text-sm focus:outline-none focus:border-[#60BBEE] transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] text-white font-manrope font-semibold py-3 rounded-lg transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}