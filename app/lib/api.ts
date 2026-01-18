const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type");

  let data: any = null;
  if (contentType?.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : "Something went wrong");

    throw new Error(message);
  }

  return data as T;
}
