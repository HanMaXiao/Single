/**
 * Admin 后台 API 客户端
 * 基于 @cultural-tourism/shared-types 的 openapi-fetch 工厂
 */
import { type ApiClient, createApiClient } from "@cultural-tourism/shared-types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiClient: ApiClient = createApiClient({
	baseUrl: BASE_URL,
	getToken: () => localStorage.getItem("admin-token"),
	onUnauthorized: () => {
		localStorage.removeItem("admin-token");
		location.href = "/login";
	},
});
