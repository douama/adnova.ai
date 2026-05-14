import { env } from "./env";

export class ApiError extends Error {
  constructor(public status: number, public code: string, public requestId?: string) {
    super(`${code} (${status})`);
  }
}

type Options = RequestInit & { token?: string };

/**
 * Thin fetch wrapper around the worker API. Throws ApiError on non-2xx.
 * Pass `token` to call protected routes (/api/*).
 */
export async function api<T = unknown>(path: string, opts: Options = {}): Promise<T> {
  const { token, headers, ...rest } = opts;
  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as Record<string, unknown>) : {};

  if (!res.ok) {
    const code = typeof data.error === "string" ? data.error : "request_failed";
    const requestId = typeof data.requestId === "string" ? data.requestId : undefined;
    throw new ApiError(res.status, code, requestId);
  }
  return data as T;
}
