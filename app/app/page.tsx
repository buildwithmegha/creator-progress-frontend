"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

type LogItem = {
  id: string;
  title: string;
  desc?: string;
  date: string;
  tag: "work" | "content" | "study";
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function TagPill({ tag }: { tag: LogItem["tag"] }) {
  const meta = useMemo(() => {
    switch (tag) {
      case "work":
        return { label: "Work", cls: "bg-indigo-100 text-indigo-700" };
      case "content":
        return { label: "Content", cls: "bg-purple-100 text-purple-700" };
      case "study":
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
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (log: Omit<LogItem, "id" | "date">) => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState<LogItem["tag"]>("work");

  function handleSubmit() {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), desc: desc.trim(), tag });
    setTitle("");
    setDesc("");
    setTag("work");
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* modal */}
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
                className="w-10 h-10 rounded-2xl bg-white/70 border border-slate-200 hover:shadow transition"
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
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Completed Google OAuth integration"
                  className="mt-2 w-full rounded-2xl soft-input px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 font-medium">
                  Details (optional)
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Add a short note..."
                  rows={4}
                  className="mt-2 w-full rounded-2xl soft-input px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400/60 transition resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm text-slate-600 font-medium mr-2">
                  Tag
                </label>

                {(["work", "content", "study"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                      tag === t
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "bg-white/70 text-slate-700 border-slate-200 hover:shadow"
                    }`}
                  >
                    {t === "work"
                      ? "Work"
                      : t === "content"
                      ? "Content"
                      : "Study"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl bg-white/70 border border-slate-200 text-slate-700 font-semibold hover:shadow transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-2xl btn-grad text-white font-semibold"
              >
                Add Progress
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function AppDashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: "1",
      title: "Designed premium landing + dashboard UI",
      desc: "Matched the mockup style (glass, waves, gradients).",
      date: "Apr 24, 2024",
      tag: "work",
    },
    {
      id: "2",
      title: "Worked on YouTube storytelling hook ideas",
      desc: "Keeping it simple: progress + consistency theme.",
      date: "Apr 25, 2024",
      tag: "content",
    },
    {
      id: "3",
      title: "Studied Spring Security basics",
      desc: "",
      date: "Apr 26, 2024",
      tag: "study",
    },
  ]);

  const streak = 5;
  const daysLogged = logs.length;
  const words = logs.reduce(
    (acc, l) => acc + (l.title.length + (l.desc?.length || 0)),
    0
  );

  const handleAdd = (log: Omit<LogItem, "id" | "date">) => {
    const now = new Date();
    setLogs((prev) => [
      {
        id: crypto.randomUUID(),
        date: formatDate(now),
        ...log,
      },
      ...prev,
    ]);
  };

  return (
    <main className="relative min-h-screen soft-bg overflow-hidden">
      <div className="absolute inset-0 soft-waves" />

      <AddProgressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
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

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-slate-700">
              🔥 <span className="font-semibold">Streak: {streak}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-slate-200" />
              <span className="font-semibold text-slate-700">Megha</span>
              <span className="text-slate-400">▾</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Current Streak", value: streak, unit: "Days" },
            { label: "Days Logged", value: daysLogged, unit: "Entries" },
            { label: "Total Words", value: words.toLocaleString(), unit: "" },
            { label: "Progress This Week", value: "3 / 7", unit: "Days" },
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

          {/* Empty state */}
          {logs.length === 0 ? (
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
                      {log.tag === "work"
                        ? "🟣"
                        : log.tag === "content"
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

                      {log.desc ? (
                        <div className="text-slate-600 text-sm mt-1 leading-relaxed">
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
                      className="w-9 h-9 rounded-xl bg-white/80 border border-slate-200 hover:shadow transition"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="w-9 h-9 rounded-xl bg-white/80 border border-slate-200 hover:shadow transition"
                      title="Delete"
                      onClick={() =>
                        setLogs((prev) => prev.filter((x) => x.id !== log.id))
                      }
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
