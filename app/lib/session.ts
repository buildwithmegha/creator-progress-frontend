import { apiFetch } from "./api";

export type UserResponse = {
  name: string;
  email: string;
};

export async function getMe(): Promise<UserResponse> {
  return apiFetch<UserResponse>("/api/me");
}
