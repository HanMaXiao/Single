import { apiFetcher } from "@/api/client";
import type { User } from "@/api/types";

const getCurrentUserRequest = apiFetcher
  .endpoint("/api/v1/users/me")
  .method("get");

export async function getCurrentUser(): Promise<User> {
  const response = await getCurrentUserRequest({});
  return response.data.data;
}
