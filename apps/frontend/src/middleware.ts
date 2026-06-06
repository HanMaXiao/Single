import { NextResponse, type NextRequest } from "next/server";

import {
  clearSessionCookie,
  createRedirectToHomeResponse,
  getInternalApiBaseUrl,
  SESSION_COOKIE_NAME,
  validateAccessToken
} from "@/auth/session";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

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
  matcher: ["/dashboard/:path*"]
};
