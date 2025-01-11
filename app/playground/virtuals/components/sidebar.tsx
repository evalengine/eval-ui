"use client";

import * as React from "react";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const ref = useRef(null);
  // useOnClickOutside(ref, () => {
  //   if (isSidebarOpen) {
  //     toggleSidebar();
  //   }
  // });

  return (
    <div
      ref={ref}
      data-state={isSidebarOpen ? "open" : "closed"}
      className={cn(className, "flex-col")}
    >
      {children}
    </div>
  );
}
