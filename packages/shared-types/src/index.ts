import type { paths } from './openapi';

export type { paths };

export interface ApiClientOptions {
  baseUrl: string;
  getToken: () => string | null;
  onUnauthorized: () => void;
}

export interface ApiClient {
  baseUrl: string;
  getToken: () => string | null;
}

export function createApiClient(options: ApiClientOptions): ApiClient {
  return {
    baseUrl: options.baseUrl,
    getToken: options.getToken,
  };
}
