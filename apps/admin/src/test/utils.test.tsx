import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatDate, formatYuan } from "@/lib/utils";

describe("utils", () => {
	describe("formatYuan", () => {
		it("converts cents to yuan with 2 decimals", () => {
			expect(formatYuan(100)).toBe("1.00");
			expect(formatYuan(12345)).toBe("123.45");
			expect(formatYuan(0)).toBe("0.00");
		});
	});

	describe("formatDate", () => {
		it("formats ISO string to zh-CN date", () => {
			const result = formatDate("2026-07-03T10:30:00Z");
			expect(result).toMatch(/2026/);
		});

		it("includes time when withTime=true", () => {
			const result = formatDate("2026-07-03T10:30:00Z", true);
			expect(result).toMatch(/2026/);
			expect(result.length).toBeGreaterThan(10);
		});
	});
});

describe("App smoke test", () => {
	it("renders without crashing (placeholder)", () => {
		// 真实组件测试后续接入,这里是骨架测试
		render(<div data-testid="placeholder">Admin App</div>);
		expect(screen.getByTestId("placeholder")).toBeInTheDocument();
	});
});
