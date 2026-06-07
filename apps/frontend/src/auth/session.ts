import { NextResponse, type NextRequest } from "next/server";

import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS
} from "@/auth/session-constants";

const TOKEN_VALIDATION_TIMEOUT_MS = 3000;

export type TokenValidationResult =
  | { isValid: true }
  | { isValid: false; reason: string };

export function getInternalApiBaseUrl(origin: string): string {
  const configuredBaseUrl =
    process.env.INTERNAL_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  return origin;
}

export function getCurrentUserUrl(apiBaseUrl: string): string {
  return new URL("/api/v1/users/me", apiBaseUrl).toString();
}

export async function validateAccessToken(
  accessToken: string,
  apiBaseUrl: string
): Promise<TokenValidationResult> {
  if (!accessToken.trim()) {
    return { isValid: false, reason: "Missing access token" };
  }

  const abortController = new AbortController();
  const timeoutId = setTimeout(
    () => abortController.abort(),
    TOKEN_VALIDATION_TIMEOUT_MS
  );

  try {
    const response = await fetch(getCurrentUserUrl(apiBaseUrl), {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      signal: abortController.signal
    });

    if (!response.ok) {
      return { isValid: false, reason: "Access token rejected" };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, reason: "Unable to validate access token" };
  } finally {
    clearTimeout(timeoutId);
  }
}

export function createRedirectToHomeResponse(
  request: NextRequest
): NextResponse {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.search = "";
  return NextResponse.redirect(redirectUrl);
}

export function applySessionCookie(
  response: NextResponse,
  accessToken: string
): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: accessToken,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export { SESSION_COOKIE_NAME };
