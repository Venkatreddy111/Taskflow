import { useState, useEffect } from "react";
/**
 * A React hook to detect the system theme preference.
 * @returns The current system theme ('light', 'dark', or 'unknown').
 */
export const useSystemTheme = () => {
    const [theme, setTheme] = useState("unknown");
    useEffect(() => {
        const mediaQueryListener = (e) => {
            setTheme(e.matches ? "dark" : "light");
        };
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        setTheme(prefersDarkScheme.matches ? "dark" : "light");
        // Listen for changes in system theme
        prefersDarkScheme.addEventListener("change", mediaQueryListener);
        return () => {
            prefersDarkScheme.removeEventListener("change", mediaQueryListener);
        };
    }, []);
    return theme;
};
