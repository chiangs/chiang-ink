// useToast.ts
// Consumes ToastContext. Must be used within a ToastProvider.
// Call show(content) to display a toast from any component or route.

import { useContext } from "react";
import { ToastContext, type ToastContextValue } from "~/lib/toast";

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
