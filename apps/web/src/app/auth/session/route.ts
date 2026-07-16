import { type NextRequest, NextResponse } from "next/server";

import {
	applySessionCookie,
	clearSessionCookie,
	getInternalApiBaseUrl,
	validateAccessToken,
} from "@/auth/session";

interface SessionRequestBody {
	accessToken: string;
}

function isSessionRequestBody(value: unknown): value is SessionRequestBody {
	return (
		typeof value === "object" &&
		value !== null &&
		"accessToken" in value &&
		typeof value.accessToken === "string"
	);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	const payload = (await request.json().catch(() => null)) as unknown;

	if (!isSessionRequestBody(payload)) {
		return NextResponse.json({ message: "Missing access token" }, { status: 400 });
	}

	const apiBaseUrl = getInternalApiBaseUrl(request.nextUrl.origin);
	const validationResult = await validateAccessToken(payload.accessToken, apiBaseUrl);

	if (!validationResult.isValid) {
		return NextResponse.json({ message: validationResult.reason }, { status: 401 });
	}

	const response = NextResponse.json({ ok: true });
	applySessionCookie(response, payload.accessToken);
	return response;
}

export function DELETE(): NextResponse {
	const response = NextResponse.json({ ok: true });
	clearSessionCookie(response);
	return response;
}
