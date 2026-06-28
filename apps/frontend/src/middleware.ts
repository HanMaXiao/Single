import { NextResponse, type NextRequest } from "next/server";

import {
  clearSessionCookie,
  createRedirectToHomeResponse,
  getInternalApiBaseUrl,
  SESSION_COOKIE_NAME,
  validateAccessToken
} from "@/auth/session";

const API_PATH_PREFIX = "/api/v1/";

function isApiRequest(pathname: string): boolean {
  return pathname.startsWith(API_PATH_PREFIX);
}

function createApiRequestResponse(
  request: NextRequest,
  accessToken: string | undefined
): NextResponse {
  const trimmedAccessToken = accessToken?.trim();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("Authorization");

  if (!trimmedAccessToken) {
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  requestHeaders.set("Authorization", `Bearer ${trimmedAccessToken}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (isApiRequest(request.nextUrl.pathname)) {
    return createApiRequestResponse(request, accessToken);
  }

  if (!accessToken) {
    return createRedirectToHomeResponse(request);
  }

  const apiBaseUrl = getInternalApiBaseUrl(request.nextUrl.origin);
  const validationResult = await validateAccessToken(accessToken, apiBaseUrl);

  if (!validationResult.isValid) {
    const response = createRedirectToHomeResponse(request);
    clearSessionCookie(response);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/v1/:path*"]
};
