import path from "node:path";
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
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
