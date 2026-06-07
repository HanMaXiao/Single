import { ApiError, Fetcher, type Middleware } from "openapi-ts-fetch";

import { env } from "@/configs/env";
import type { paths } from "@/api/generated/schema";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/auth/session-constants";

export const TOKEN_STORAGE_KEY = ACCESS_TOKEN_STORAGE_KEY;

const authMiddleware: Middleware = async (url, init, next) => {
  if (typeof window === "undefined") {
    return next(url, init);
  }

  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    return next(url, init);
  }

  init.headers.set("Authorization", `Bearer ${token}`);
  return next(url, init);
};

export const apiFetcher = Fetcher.for<paths>().configure({
  baseUrl: env.apiBaseUrl,
  use: [authMiddleware]
});

export { ApiError };
