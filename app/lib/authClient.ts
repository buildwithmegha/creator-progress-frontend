import { clearToken, getToken } from "./token";

export function requireAuth(router: any) {
  const token = getToken();
  if (!token) {
    router.replace("/login");
    return false;
  }
  return true;
}

export function logout(router: any) {
  clearToken();
  router.replace("/");
}
