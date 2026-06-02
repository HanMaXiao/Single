import type { AxiosError } from "axios";

export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface ApiErrorDetail {
  detail?: string;
}

export function getHttpErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorDetail>;

  if (axiosError.response?.data?.detail) {
    return axiosError.response.data.detail;
  }

  return axiosError.message || "Request failed";
}
