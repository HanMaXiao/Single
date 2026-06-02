import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/http";
import type { User } from "@/api/types";

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  return http.get<unknown, ApiResponse<User>>("/api/v1/users/me");
}
