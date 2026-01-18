import { apiFetch } from "./api";

export type StatsResponse = {
  currentStreak: number;
  daysLogged: number;
  totalWords: number;
  progressThisWeek: number;
  weeklyTarget: number;
};

export async function fetchStats(): Promise<StatsResponse> {
  return apiFetch<StatsResponse>("/api/stats", {
    method: "GET",
  });
}
