// Toast.tsx
// Generic non-blocking notification — slides in from top-right, below the navbar.
// Content is fully projected via children; this component owns only the chrome.

import type { ReactNode } from "react";

const ARIA_DISMISS = "Dismiss notification";
const LABEL_DISMISS = "✕";

const containerStyle: React.CSSProperties = {
  position: "fixed",
  top: "72px",
  right: "24px",
  zIndex: 1000,
  width: "min(360px, calc(100vw - 48px))",
};

const innerStyle: React.CSSProperties = {
  borderLeft: "2px solid var(--color-viz-teal)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
};

type ToastProps = {
  isVisible: boolean;
  onDismiss: () => void;
  children: ReactNode;
};

export function Toast({ isVisible, onDismiss, children }: ToastProps) {
  const transform = isVisible
    ? "translateX(0)"
    : "translateX(calc(100% + 24px))";

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      aria-label="Notification"
      style={{
        ...containerStyle,
        transform,
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="bg-surface-high flex items-start gap-4 px-5 py-4"
        style={innerStyle}
      >
        <div className="flex-1 font-body text-sm text-text-primary leading-relaxed">
          {children}
        </div>
        <button
          onClick={onDismiss}
          aria-label={ARIA_DISMISS}
          className="shrink-0 mt-0.5 bg-transparent border-0 cursor-pointer p-0 font-body text-sm font-medium text-text-muted leading-none transition-colors duration-200 hover:text-text-primary"
        >
          {LABEL_DISMISS}
        </button>
      </div>
    </aside>
  );
}
