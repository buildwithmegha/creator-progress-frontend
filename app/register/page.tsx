"use client";
import { GoogleLogin } from "@react-oauth/google";
import { apiFetch } from "../lib/api";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../lib/auth";
import { setToken } from "../lib/token";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setToken(res.token);

      router.push("/app");
    } catch (e: any) {
      setError(e?.message || "Registration failed");
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
                Start tracking your
                <br />
                <span className="text-indigo-600">daily progress</span>
                <br />
                from today.
              </h1>

              <p className="mt-4 text-slate-600">
                Create your account and build consistency — one small win at a
                time.
              </p>

              <div className="mt-7 text-sm text-slate-500 space-y-2">
                <div>📝 Daily logs that actually feel good</div>
                <div>🔥 Streaks without pressure</div>
                <div>📊 Premium dashboard view</div>
              </div>
            </div>

            {/* RIGHT (Form Card) */}
            <div className="glass rounded-3xl p-7 md:p-8">
              <h2 className="text-2xl font-semibold text-slate-800">
                Create account
              </h2>

              <div className="mt-6 space-y-4">
                {/* Error */}
                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {/* Name */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    👤
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl soft-input px-11 py-3.5 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                  />
                </div>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl soft-input px-11 py-3.5 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                  />
                </div>

                {/* Confirm */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ✅
                  </span>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl soft-input px-11 py-3.5 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                  />
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full rounded-2xl py-3.5 text-white font-semibold btn-grad disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create Account"}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-px bg-slate-200 flex-1" />
                  <div className="text-slate-400 text-sm">or</div>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* Google (UI only for now) */}
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
                        if (!idToken) throw new Error("Google signup failed.");

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
                        setError(e?.message || "Google signup failed");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    onError={() => setError("Google signup failed")}
                  />
                </div>

                {/* Footer */}
                <div className="pt-2 text-center text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Sign in →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tiny footer */}
          <div className="mt-8 text-center text-xs text-slate-500">
            By creating an account, you agree to our Terms & Privacy Policy.
          </div>
        </motion.div>
      </div>
    </main>
  );
}
