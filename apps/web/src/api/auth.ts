import { apiFetcher } from "@/api/client";
import type { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from "@/api/types";

const loginRequest = apiFetcher.endpoint("/api/v1/auth/login").method("post");
const registerRequest = apiFetcher.endpoint("/api/v1/auth/register").method("post");

export async function login(payload: LoginRequest): Promise<LoginResponse> {
	const response = await loginRequest({ body: payload });
	return response.data;
}

export async function register(payload: RegisterRequest): Promise<UserResponse> {
	const response = await registerRequest({ body: payload });
	return response.data;
}

export async function establishSession(accessToken: string): Promise<void> {
	const response = await fetch("/auth/session", {
		body: JSON.stringify({ accessToken }),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	if (!response.ok) {
		throw new Error("Unable to establish authenticated session");
	}
}

export async function clearSession(): Promise<void> {
	const response = await fetch("/auth/session", {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Unable to clear session");
	}
}
