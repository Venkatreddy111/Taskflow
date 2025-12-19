import { PriorityHighRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { ToastIconWrapper } from "../styles";
import { ColorPalette } from "../theme/themeConfig";
const customTypeConfig = {
    warning: {
        icon: (<ToastIconWrapper bgColor={ColorPalette.orange}>
        <PriorityHighRounded />
      </ToastIconWrapper>),
        borderColor: ColorPalette.orange,
    },
    info: {
        icon: (<ToastIconWrapper bgColor={ColorPalette.blue}>
        <PriorityHighRounded sx={{ transform: "rotate(180deg)" }}/>
      </ToastIconWrapper>),
        borderColor: ColorPalette.blue,
    },
};
/**
 * Displays a configurable toast notification
 *
 * @param {Renderable} message - Content to display in the toast
 * @param {ToastProps} [options] - Configuration options for toast behavior and appearance
 *
 * @example
 * // basic usage
 * showToast('Update successful!', { type: "success" });
 *
 * @example
 * // with duplicate prevention
 * import { useToasterStore } from "react-hot-toast";
 *
 * const { toasts } = useToasterStore();
 *
 * showToast('Only show once at a time', {
 *   preventDuplicate: true,
 *   id: 'unique-message',
 *   visibleToasts: toasts
 * });
 */
export const showToast = (message, { type = "success", disableClickDismiss, disableVibrate, dismissButton, preventDuplicate, visibleToasts, ...toastOptions } = {}) => {
    // Prevent showing duplicate of toasts if enabled
    if (preventDuplicate) {
        if (!toastOptions.id || !visibleToasts) {
            throw new Error("[Toast] `preventDuplicate: true` requires both `id` and `visibleToasts`.");
        }
        const alreadyVisible = visibleToasts.some((t) => t.id === toastOptions.id && t.visible);
        if (alreadyVisible) {
            //Taskflow: reset toast duration
            const elem = document.getElementById(toastOptions.id);
            if (elem) {
                applyBounce(elem);
            }
            return;
        }
    }
    // Selects the appropriate toast function based on the specified type
    const toastFunction = {
        error: toast.error,
        success: toast.success,
        loading: toast.loading,
        custom: toast.custom,
        blank: toast,
        warning: toast,
        info: toast,
    }[type];
    // Vibrates the device based on the toast type, unless disabled or not supported.
    if (!disableVibrate && "vibrate" in navigator) {
        const vibrationPattern = type === "error" ? [100, 50, 100] : [100];
        try {
            navigator.vibrate(vibrationPattern);
        }
        catch (err) {
            console.error(err);
        }
    }
    // handle custom types
    if (type in customTypeConfig) {
        const { icon, borderColor } = customTypeConfig[type];
        toastOptions.icon = icon;
        toastOptions.style = {
            ...toastOptions.style,
            borderColor,
        };
    }
    // Display the toast notification.
    toastFunction((t) => (<div onClick={!disableClickDismiss && !dismissButton ? () => toast.dismiss(t.id) : undefined}>
        {message}
        {dismissButton && (<div>
            <Button variant="outlined" fullWidth onClick={() => toast.dismiss(t.id)} sx={{ mt: "8px", w: "100%", p: "12px 24px", fontSize: "16px", borderRadius: "16px" }}>
              Dismiss
            </Button>
          </div>)}
      </div>), {
        ...toastOptions, // Passes any additional toast options.
    });
};
// helper to bounce toast using Web Animations API
export const applyBounce = (element) => {
    const inner = element.firstElementChild;
    if (!inner)
        return;
    // cancel any ongoing bounce
    inner.getAnimations().forEach((anim) => anim.cancel());
    const BOUNCE_KEYFRAMES = [
        { transform: "scale(1)" },
        { transform: "scale(1.1)" },
        { transform: "scale(0.95)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" },
    ];
    const BOUNCE_OPTIONS = {
        duration: 400,
        easing: "ease",
    };
    const { transform, transition, animation } = inner.style;
    const animationInstance = inner.animate(BOUNCE_KEYFRAMES, BOUNCE_OPTIONS);
    animationInstance.onfinish = () => {
        if (!inner.isConnected)
            return;
        inner.style.transform = transform;
        inner.style.transition = transition;
        inner.style.animation = animation;
    };
};
