import { ApiError, Fetcher, type Middleware } from "openapi-ts-fetch";

import { env } from "@/configs/env";
import type { paths } from "@/api/generated/schema";

const sessionCookieMiddleware: Middleware = async (url, init, next) => {
  if (typeof window === "undefined") {
    return next(url, init);
  }

  init.credentials = "same-origin";
  return next(url, init);
};

function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }

  return env.apiBaseUrl;
}

export const apiFetcher = Fetcher.for<paths>().configure({
  baseUrl: getApiBaseUrl(),
  use: [sessionCookieMiddleware]
});

export { ApiError };
