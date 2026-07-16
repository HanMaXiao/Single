import { ApiError } from '@/api/client';

export interface ApiErrorDetail {
  detail?: string | { msg: string }[];
}

export function getHttpErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const errorData = error.data as ApiErrorDetail | undefined;

    if (typeof errorData?.detail === 'string') {
      return errorData.detail;
    }

    if (Array.isArray(errorData?.detail)) {
      return errorData.detail.map((detail) => detail.msg).join('; ');
    }

    return error.message || 'Request failed';
  }

  if (error instanceof Error) {
    return error.message || 'Request failed';
  }

  return 'Request failed';
}
