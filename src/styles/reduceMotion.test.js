import { describe, it, expect } from "vitest";
import { reduceMotion } from "./reduceMotion.styled";
describe("reduceMotion", () => {
    const createMockTheme = (reduceMotion) => ({
        reduceMotion,
    });
    it("returns null when theme.reduceMotion is off", () => {
        const theme = createMockTheme("off");
        const result = reduceMotion(theme);
        expect(result).toBeNull();
    });
    it("returns SerializedStyles with disabled animations when theme.reduceMotion is on", () => {
        const theme = createMockTheme("on");
        const result = reduceMotion(theme);
        expect(result).not.toBeNull();
        expect(result?.name).toBeDefined();
        expect(result?.styles).toContain("animation:none");
        expect(result?.styles).toContain("transition:none");
    });
    it("wraps styles in @media when theme.reduceMotion is system", () => {
        const theme = createMockTheme("system");
        const result = reduceMotion(theme);
        expect(result?.styles).toContain("@media (prefers-reduced-motion: reduce)");
        expect(result?.styles).toContain("animation:none");
        expect(result?.styles).toContain("transition:none");
    });
    it("merges custom CSS properties correctly", () => {
        const theme = createMockTheme("on");
        const customOptions = { opacity: 0, color: "red" };
        const result = reduceMotion(theme, customOptions);
        expect(result?.styles).toContain("opacity:0");
        expect(result?.styles).toContain("color:red");
    });
});
