"use client";

import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen soft-bg overflow-hidden">
      <div className="absolute inset-0 soft-waves" />

      {/* NAVBAR */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl btn-grad flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div className="text-lg font-semibold text-slate-800">
              Creator Progress Tracker
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-5 py-2 rounded-full bg-white/80 border border-slate-200
                         shadow-sm hover:shadow-md transition text-sm font-semibold text-slate-700"
            >
              Login
            </a>

            <a
              href="/app"
              className="px-5 py-2 rounded-full btn-grad text-white shadow-md
                         hover:shadow-xl transition text-sm font-semibold"
            >
              Start Tracking
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900"
            >
              Track your <span className="text-indigo-600">daily progress</span>
              .
              <br />
              Build <span className="text-indigo-600">consistency</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              className="mt-5 text-lg text-slate-600 max-w-xl"
            >
              A clean, calming space for creators and developers to log small
              wins, stay consistent, and watch progress compound.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="mt-9 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/app"
                className="px-7 py-3 rounded-2xl btn-grad text-white font-semibold text-center"
              >
                Start tracking →
              </a>

              <a
                href="/register"
                className="px-7 py-3 rounded-2xl bg-white/85 border border-slate-200
                           shadow-sm hover:shadow-md transition font-semibold text-slate-700 text-center"
              >
                Create a free account
              </a>
            </motion.div>

            {/* Mini trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Google Sign-in", "Secure data", "Simple dashboard"].map(
                (t) => (
                  <div
                    key={t}
                    className="px-4 py-2 rounded-full bg-white/70 border border-white/60
                             text-sm text-slate-600 shadow-sm"
                  >
                    ✨ {t}
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT: Preview Card like dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="glass rounded-[32px] p-6">
              {/* Topbar preview */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-800">Dashboard</div>
                <div className="text-slate-500 text-sm">Streak: 🔥 5</div>
              </div>

              {/* Stats preview */}
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="bg-white/75 rounded-2xl p-4 border border-white/60">
                  <div className="text-xs text-slate-500">Current Streak</div>
                  <div className="text-2xl font-semibold text-slate-800 mt-1">
                    5 <span className="text-sm text-slate-500">days</span>
                  </div>
                </div>
                <div className="bg-white/75 rounded-2xl p-4 border border-white/60">
                  <div className="text-xs text-slate-500">Days Logged</div>
                  <div className="text-2xl font-semibold text-slate-800 mt-1">
                    12
                  </div>
                </div>
              </div>

              {/* Logs preview */}
              <div className="mt-5 space-y-3">
                {[
                  "Worked on Spring Boot authentication",
                  "Designed premium landing page",
                  "Recorded YouTube storytelling video",
                ].map((x, i) => (
                  <div
                    key={i}
                    className="bg-white/75 rounded-2xl px-4 py-3 border border-white/60
                               flex items-center justify-between"
                  >
                    <div className="text-slate-700 font-medium text-sm">
                      {x}
                    </div>
                    <div className="text-slate-400 text-xs">Today</div>
                  </div>
                ))}
              </div>

              {/* Button preview */}
              <div className="mt-6 flex justify-end">
                <div className="px-5 py-2 rounded-2xl btn-grad text-white font-semibold text-sm">
                  + Add Progress
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Daily Logs",
              desc: "Write quick progress updates in a clean, distraction-free way.",
              icon: "📝",
            },
            {
              title: "Consistency Streaks",
              desc: "Stay consistent with streak counters that feel motivating, not stressful.",
              icon: "🔥",
            },
            {
              title: "Premium Dashboard",
              desc: "A beautiful interface that makes you want to come back daily.",
              icon: "📊",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="glass rounded-3xl p-7"
            >
              <div className="text-2xl">{f.icon}</div>
              <div className="mt-4 text-lg font-semibold text-slate-800">
                {f.title}
              </div>
              <div className="mt-2 text-slate-600">{f.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 glass rounded-3xl p-8">
          <div>
            <div className="text-xl font-semibold text-slate-800">
              Ready to build consistency?
            </div>
            <div className="mt-1 text-slate-600">
              Start free. Upgrade later. Keep building.
            </div>
          </div>
          <a
            href="/app"
            className="px-8 py-3 rounded-2xl btn-grad text-white font-semibold shadow-md hover:shadow-xl transition"
          >
            Open Dashboard →
          </a>
        </div>
      </section>
    </main>
  );
}
