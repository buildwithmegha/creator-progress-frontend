"use client";
import { GoogleLogin } from "@react-oauth/google";
import { apiFetch } from "../lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../lib/auth";
import { setToken } from "../lib/token";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email: email.trim(),
        password,
      });

      setToken(res.token);

      router.push("/app");
    } catch (e: any) {
      console.log(e);
      setError(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen soft-bg overflow-hidden">
      <div className="absolute inset-0 soft-waves" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-5xl glass rounded-[32px] p-8 md:p-10"
        >
          {/* Top */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl btn-grad flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div className="text-lg font-semibold text-slate-800">
              Creator Progress Tracker
            </div>
          </div>

          {/* Content */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* LEFT (Hero) */}
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-800">
                Welcome back 🌱
                <br />
                Continue your <span className="text-indigo-600">progress</span>.
              </h1>

              <p className="mt-4 text-slate-600">
                Log your daily wins and keep your streak alive.
              </p>

              <div className="mt-7 text-sm text-slate-500 space-y-2">
                <div>🔥 Your streak is waiting</div>
                <div>📝 Continue daily logs</div>
                <div>📊 Dashboard becomes available after login</div>
              </div>
            </div>

            {/* RIGHT (Form) */}
            <div className="glass rounded-3xl p-7 md:p-8">
              <h2 className="text-2xl font-semibold text-slate-800">Sign in</h2>

              <div className="mt-6 space-y-4">
                {/* Error */}
                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {/* Email */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ✉️
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl soft-input px-11 py-3.5 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl soft-input px-11 py-3.5 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                  />
                </div>

                <div className="text-right">
                  <button className="text-sm text-slate-500 hover:text-indigo-600 transition">
                    Forgot password?
                  </button>
                </div>

                {/* Sign In */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full rounded-2xl py-3.5 text-white font-semibold btn-grad disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-px bg-slate-200 flex-1" />
                  <div className="text-slate-400 text-sm">or</div>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* Google (UI only now) */}
                {/* <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setError("Google login will be added next 🚀")}
                  className="w-full rounded-2xl py-3.5 bg-white/80 border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center gap-3"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="font-semibold text-slate-700">
                    Continue with Google
                  </span>
                </motion.button> */}
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      try {
                        setError("");
                        setLoading(true);

                        const idToken = credentialResponse.credential;
                        if (!idToken) throw new Error("Google login failed.");

                        const res = await apiFetch<{
                          token: string;
                          name: string;
                          email: string;
                        }>("/auth/google", {
                          method: "POST",
                          body: JSON.stringify({ idToken }),
                        });

                        setToken(res.token);
                        router.push("/app");
                      } catch (e: any) {
                        setError(e?.message || "Google login failed");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    onError={() => setError("Google login failed")}
                  />
                </div>

                {/* Footer */}
                <div className="pt-2 text-center text-slate-500">
                  No account?{" "}
                  <a
                    href="/register"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Create one →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
