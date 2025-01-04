"use client";

import { ToastProvider } from "./toast";

export function ToastWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
} 