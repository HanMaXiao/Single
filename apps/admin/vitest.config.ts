import path from "node:path";
import react from "@vitejs/plugin-react";
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@cultural-tourism/shared-types": path.resolve(
				__dirname,
				"../../packages/shared-types/src/index.ts",
			),
			"@cultural-tourism/shared-i18n": path.resolve(
				__dirname,
				"../../packages/shared-i18n/src/index.ts",
			),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		css: false,
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "lcov"],
			exclude: ["**/node_modules/**", "**/dist/**", "**/*.config.*", "src/test/**"],
		},
	},
});
