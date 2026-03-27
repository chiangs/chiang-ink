// toast.tsx
// Toast context and provider.
// Wrap ToastProvider around the layout to enable useToast in any component or route.

import {
  createContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";

const DEFAULT_AUTO_DISMISS_MS = 8000;

export type ToastContextValue = {
  isVisible: boolean;
  content: ReactNode;
  show: (content: ReactNode, autoDismissMs?: number) => void;
  dismiss: () => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const show = useCallback(
    (newContent: ReactNode, autoDismissMs = DEFAULT_AUTO_DISMISS_MS) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setContent(newContent);
      setIsVisible(true);
      timerRef.current = setTimeout(dismiss, autoDismissMs);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ isVisible, content, show, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function getToastContext(): typeof ToastContext {
  return ToastContext;
}
