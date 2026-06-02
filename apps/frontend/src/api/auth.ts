import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/http";
import type { LoginRequest, RegisterRequest, TokenData, User } from "@/api/types";

export async function login(
  payload: LoginRequest
): Promise<ApiResponse<TokenData>> {
  return http.post<unknown, ApiResponse<TokenData>, LoginRequest>(
    "/api/v1/auth/login",
    payload
  );
}

export async function register(
  payload: RegisterRequest
): Promise<ApiResponse<User>> {
  return http.post<unknown, ApiResponse<User>, RegisterRequest>(
    "/api/v1/auth/register",
    payload
  );
}
