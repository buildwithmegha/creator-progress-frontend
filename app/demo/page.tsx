"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Current Streak", value: "5", unit: "Days" },
  { label: "Days Logged", value: "12", unit: "Entries" },
  { label: "Total Words", value: "1,842", unit: "" },
  { label: "Progress This Week", value: "3 / 7", unit: "Days" },
];

const logs = [
  {
    title: "Worked on the login authentication today.",
    desc: "Feeling good about the progress.",
    date: "April 24, 2024",
    icon: "🟣",
  },
  {
    title: "Recorded a new YouTube video. Need to edit it later tonight.",
    desc: "",
    date: "April 29, 2024",
    icon: "🟣",
  },
  {
    title: "Studied system design concepts for an hour.",
    desc: "",
    date: "April 24, 2024",
    icon: "🔵",
  },
];

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md glass rounded-3xl p-7"
          >
            <h3 className="text-xl font-semibold text-slate-800">
              Create an account to continue ✨
            </h3>
            <p className="mt-2 text-slate-600 text-sm">
              Demo is public. Saving progress needs a free account.
            </p>

            <div className="mt-6 space-y-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/login")}
                className="w-full rounded-2xl py-3.5 btn-grad text-white font-semibold"
              >
                Continue with Google
              </motion.button>

              <button
                onClick={() => router.push("/login")}
                className="w-full rounded-2xl py-3.5 bg-white/85 border border-slate-200 shadow-sm hover:shadow transition font-semibold text-slate-700"
              >
                Sign in with Email
              </button>

              <button
                onClick={onClose}
                className="w-full rounded-2xl py-3.5 text-slate-600 hover:text-slate-900 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function DemoDashboard() {
  const [loginOpen, setLoginOpen] = useState(false);

  const requireLogin = () => setLoginOpen(true);

  return (
    <main className="relative min-h-screen soft-bg overflow-hidden">
      <div className="absolute inset-0 soft-waves" />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        {/* Top Bar */}
        <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl btn-grad flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div className="font-semibold text-slate-800">
              Creator Progress Tracker
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-700">
            <div className="flex items-center gap-2">
              🔥 <span className="font-semibold">Streak: 5</span>
            </div>

            <button
              onClick={requireLogin}
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              <div className="w-9 h-9 rounded-full bg-slate-200" />
              <span className="font-semibold">Megha</span>
              <span className="text-slate-400">▾</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="glass rounded-2xl p-5"
              onClick={requireLogin}
            >
              <div className="text-sm text-slate-500">{s.label}</div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-semibold text-slate-800">
                  {s.value}
                </div>
                <div className="text-slate-500 pb-1">{s.unit}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Progress */}
        <div className="mt-8 glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Daily Progress
            </h2>
            <button onClick={requireLogin} className="text-slate-400">
              •••
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="bg-white/70 border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-start justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span>{log.icon}</span>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-800">
                      {log.title}
                    </div>
                    {log.desc ? (
                      <div className="text-slate-600 text-sm mt-1">
                        {log.desc}
                      </div>
                    ) : null}
                    <div className="text-slate-500 text-xs mt-2">
                      {log.date}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 text-slate-500">
                  <button
                    onClick={requireLogin}
                    className="w-9 h-9 rounded-xl bg-white/80 border border-slate-200 hover:shadow transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={requireLogin}
                    className="w-9 h-9 rounded-xl bg-white/80 border border-slate-200 hover:shadow transition"
                  >
                    🗑️
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={requireLogin}
              className="rounded-2xl px-6 py-3 text-white font-semibold btn-grad"
            >
              ＋ Add Progress
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
}
