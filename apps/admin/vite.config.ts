import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@cultural-tourism/shared-types": path.resolve(
				__dirname,
				"../../packages/shared-types/src/index.ts",
			),
			"@cultural-tourism/shared-i18n/i18n": path.resolve(
				__dirname,
				"../../packages/shared-i18n/src/i18n.ts",
			),
			"@cultural-tourism/shared-i18n/locale-guard": path.resolve(
				__dirname,
				"../../packages/shared-i18n/src/locale-guard.ts",
			),
			"@cultural-tourism/shared-i18n/locales/zh-CN": path.resolve(
				__dirname,
				"../../packages/shared-i18n/src/locales/zh-CN.ts",
			),
			"@cultural-tourism/shared-i18n/locales/en-US": path.resolve(
				__dirname,
				"../../packages/shared-i18n/src/locales/en-US.ts",
			),
			"@cultural-tourism/shared-i18n": path.resolve(
				__dirname,
				"../../packages/shared-i18n/src/index.ts",
			),
		},
	},
	server: {
		port: 5174,
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true,
			},
		},
	},
	build: {
		target: "es2022",
		sourcemap: true,
		chunkSizeWarningLimit: 1024,
	},
});
