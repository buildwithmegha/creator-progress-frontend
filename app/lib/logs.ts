import { apiFetch } from "./api";

export type LogItem = {
  id: number;
  title: string;
  description: string;
  tag: "WORK" | "CONTENT" | "STUDY";
  createdAt: string; // ISO time
};

export async function fetchLogs(): Promise<LogItem[]> {
  return apiFetch<LogItem[]>("/api/logs", {
    method: "GET",
  });
}

export async function createLog(payload: {
  title: string;
  description?: string;
  tag: "WORK" | "CONTENT" | "STUDY";
}): Promise<LogItem> {
  return apiFetch<LogItem>("/api/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteLog(id: number): Promise<void> {
  return apiFetch<void>(`/api/logs/${id}`, {
    method: "DELETE",
  });
}
