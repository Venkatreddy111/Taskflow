import { useMediaQuery } from "@mui/material";
/**
 * Custom hook to determine whether to reduce motion based on user setting and system preference.
 *
 * @param reduceMotionSetting - user's reduce motion setting (system | on | off).
 * @returns A boolean indicating if reduced motion should be applied.
 * @example const prefersReducedMotion = usePrefersReducedMotion(user.settings.reduceMotion);
 */
export function usePrefersReducedMotion(reduceMotionSetting) {
    const systemPrefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    if (reduceMotionSetting === "on")
        return true;
    if (reduceMotionSetting === "off")
        return false;
    // system fallback
    return systemPrefersReducedMotion;
}
