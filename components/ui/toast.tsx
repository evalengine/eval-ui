"use client";

import { useEffect, useState, createContext, useContext } from 'react';
import { X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastComponent = ({ toast, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const bgColor = {
    success: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/20',
    error: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/20',
    info: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/20',
  }[toast.type];

  const textColor = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-purple-400',
  }[toast.type];

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg backdrop-blur-xl border ${bgColor} mb-2 animate-slide-up`}>
      <p className={`${textColor} text-sm`}>{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className={`ml-4 p-1 rounded-full hover:bg-white/10 ${textColor} transition-colors`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};
