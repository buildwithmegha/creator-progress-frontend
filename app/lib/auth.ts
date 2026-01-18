import { apiFetch } from "./api";

export type AuthResponse = {
  token: string;
  name: string;
  email: string;
};

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logoutUser(): Promise<void> {
  return apiFetch<void>("/auth/logout", {
    method: "POST",
  });
}
