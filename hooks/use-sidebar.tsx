"use client";

import * as React from "react";

const LOCAL_STORAGE_KEY = "sidebar";

interface SidebarContext {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isLoading: boolean;
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((value) => {
      const newState = !value;
      return newState;
    });
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
        isLoading,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
