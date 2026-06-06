import { apiFetcher } from "@/api/client";
import type { UserResponse } from "@/api/types";

const getCurrentUserRequest = apiFetcher
  .endpoint("/api/v1/users/me")
  .method("get");

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await getCurrentUserRequest({});
  return response.data;
}
