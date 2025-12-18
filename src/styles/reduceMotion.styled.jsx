import { css } from "@emotion/react";
/**
 * Returns CSS styles that disable animations and transitions when motion reduction is preferred.
 * @param theme - Emotion theme object
 * @param options - Optional CSS properties to include when disabling motion
 * @returns SerializedStyles or undefined
 */
export const reduceMotion = (theme, options) => {
    if (theme.reduceMotion === "off")
        return null;
    const disableStyles = css({
        animation: "none !important",
        transition: "none !important",
        ...options,
    });
    if (theme.reduceMotion === "on")
        return disableStyles;
    // fallback to OS-level preference
    return css `
    @media (prefers-reduced-motion: reduce) {
      ${disableStyles}
    }
  `;
};
