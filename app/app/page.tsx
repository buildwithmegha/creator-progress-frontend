"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getMe } from "../lib/session";
import { logoutUser } from "../lib/auth";
import { fetchLogs, createLog, deleteLog, LogItem } from "../lib/logs";
import { fetchStats, StatsResponse } from "../lib/stats";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function TagPill({ tag }: { tag: LogItem["tag"] }) {
  const meta = useMemo(() => {
    switch (tag) {
      case "WORK":
        return { label: "Work", cls: "bg-indigo-100 text-indigo-700" };
      case "CONTENT":
        return { label: "Content", cls: "bg-purple-100 text-purple-700" };
      case "STUDY":
        return { label: "Study", cls: "bg-blue-100 text-blue-700" };
      default:
        return { label: "Tag", cls: "bg-slate-100 text-slate-700" };
    }
  }, [tag]);

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.cls}`}
    >
      {meta.label}
    </span>
  );
}

function AddProgressModal({
  open,
  onClose,
  onAdd,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (log: {
    title: string;
    description?: string;
    tag: LogItem["tag"];
  }) => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState<LogItem["tag"]>("WORK");

  function handleSubmit() {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: desc.trim(), tag });
  }

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDesc("");
      setTag("WORK");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => !saving && onClose()}
          />

          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-xl glass rounded-[32px] p-7"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Add progress ✨
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Log one small win. Consistency wins.
                </p>
              </div>

              <button
                onClick={onClose}
                disabled={saving}
                className="w-10 h-10 rounded-2xl bg-white/70 border border-slate-200 hover:shadow transition disabled:opacity-60"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-600 font-medium">
                  Title
                </label>
                <input
                  value={title}
                  disabled={saving}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Completed Google OAuth integration"
                  className="mt-2 w-full rounded-2xl soft-input px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400/60 transition disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 font-medium">
                  Details (optional)
                </label>
                <textarea
                  value={desc}
                  disabled={saving}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Add a short note..."
                  rows={4}
                  className="mt-2 w-full rounded-2xl soft-input px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400/60 transition resize-none disabled:opacity-60"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm text-slate-600 font-medium mr-2">
                  Tag
                </label>

                {(["WORK", "CONTENT", "STUDY"] as const).map((t) => (
                  <button
                    key={t}
                    disabled={saving}
                    onClick={() => setTag(t)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition disabled:opacity-60 ${
                      tag === t
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "bg-white/70 text-slate-700 border-slate-200 hover:shadow"
                    }`}
                  >
                    {t === "WORK"
                      ? "Work"
                      : t === "CONTENT"
                      ? "Content"
                      : "Study"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={saving}
                className="px-5 py-2.5 rounded-2xl bg-white/70 border border-slate-200 text-slate-700 font-semibold hover:shadow transition disabled:opacity-60"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 rounded-2xl btn-grad text-white font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Add Progress"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function AppDashboardPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [savingLog, setSavingLog] = useState(false);

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [stats, setStats] = useState<StatsResponse | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [logs, setLogs] = useState<LogItem[]>([]);
  const [error, setError] = useState("");

  // ✅ Auth check + load logs + load stats
  useEffect(() => {
    async function init() {
      try {
        setError("");

        const me = await getMe();
        setUser(me);

        const [dbLogs, dbStats] = await Promise.all([
          fetchLogs(),
          fetchStats(),
        ]);

        setLogs(dbLogs);
        setStats(dbStats);
      } catch (e) {
        router.replace("/login");
      } finally {
        setCheckingAuth(false);
        setLoadingLogs(false);
      }
    }
    init();
  }, [router]);

  async function refreshStats() {
    try {
      const s = await fetchStats();
      setStats(s);
    } catch {
      // ignore
    }
  }

  async function handleAdd(log: {
    title: string;
    description?: string;
    tag: LogItem["tag"];
  }) {
    try {
      setSavingLog(true);
      setError("");

      const created = await createLog({
        title: log.title,
        description: log.description,
        tag: log.tag,
      });

      setLogs((prev) => [created, ...prev]);
      setModalOpen(false);

      await refreshStats();
    } catch (e: any) {
      setError(e?.message || "Failed to save progress");
    } finally {
      setSavingLog(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      setError("");
      await deleteLog(id);
      setLogs((prev) => prev.filter((x) => x.id !== id));

      await refreshStats();
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    }
  }

  if (checkingAuth) {
    return (
      <main className="relative min-h-screen soft-bg overflow-hidden">
        <div className="absolute inset-0 soft-waves" />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="glass rounded-3xl px-8 py-6 text-slate-700 font-semibold">
            Loading your dashboard...
          </div>
        </div>
      </main>
    );
  }

  const currentStreak = stats?.currentStreak ?? 0;
  const daysLogged = stats?.daysLogged ?? 0;
  const totalWords = stats?.totalWords ?? 0;
  const progressThisWeek = stats?.progressThisWeek ?? 0;
  const weeklyTarget = stats?.weeklyTarget ?? 7;

  return (
    <main className="relative min-h-screen soft-bg overflow-hidden">
      <div className="absolute inset-0 soft-waves" />

      <AddProgressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
        saving={savingLog}
      />

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

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-slate-700">
              🔥 <span className="font-semibold">Streak: {currentStreak}</span>
            </div>

            <button
              onClick={async () => {
                await logoutUser();
                router.replace("/");
              }}
              className="px-4 py-2 rounded-full bg-white/75 border border-slate-200 text-slate-700 font-semibold hover:shadow transition"
            >
              Logout
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-slate-200" />
              <span className="font-semibold text-slate-700">
                {user?.name || "User"}
              </span>
              <span className="text-slate-400">▾</span>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error ? (
          <div className="mt-6 glass rounded-2xl px-5 py-4 border border-red-200 bg-red-50/60 text-red-700 font-semibold">
            {error}
          </div>
        ) : null}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Current Streak", value: currentStreak, unit: "Days" },
            { label: "Days Logged", value: daysLogged, unit: "Days" },
            {
              label: "Total Words",
              value: totalWords.toLocaleString(),
              unit: "",
            },
            {
              label: "Progress This Week",
              value: `${progressThisWeek} / ${weeklyTarget}`,
              unit: "Days",
            },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="glass rounded-2xl p-5"
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

        {/* Logs Section */}
        <div className="mt-8 glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Daily Progress
            </h2>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="rounded-2xl px-6 py-3 text-white font-semibold btn-grad"
            >
              ＋ Add Progress
            </motion.button>
          </div>

          {loadingLogs ? (
            <div className="mt-10 text-center py-14 text-slate-600 font-semibold">
              Fetching your logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="mt-10 text-center py-14">
              <div className="text-3xl">🌱</div>
              <div className="mt-3 font-semibold text-slate-800 text-xl">
                No progress logged yet
              </div>
              <div className="mt-2 text-slate-600">
                Start with one small win today.
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-6 px-6 py-3 rounded-2xl btn-grad text-white font-semibold"
              >
                Add your first progress
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  whileHover={{ y: -3 }}
                  className="bg-white/70 border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-start justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">
                      {log.tag === "WORK"
                        ? "🟣"
                        : log.tag === "CONTENT"
                        ? "🟪"
                        : "🔵"}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-slate-800">
                          {log.title}
                        </div>
                        <TagPill tag={log.tag} />
                      </div>

                      {log.description ? (
                        <div className="text-slate-600 text-sm mt-1 leading-relaxed">
                          {log.description}
                        </div>
                      ) : null}

                      <div className="text-slate-500 text-xs mt-2">
                        {formatDate(log.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 text-slate-500">
                    <button
                      className="w-9 h-9 rounded-xl bg-white/80 border border-slate-200 hover:shadow transition"
                      title="Delete"
                      onClick={() => handleDelete(log.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
