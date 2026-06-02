import axios from "axios";

import { env } from "@/configs/env";

export const TOKEN_STORAGE_KEY = "access_token";

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000
});

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
