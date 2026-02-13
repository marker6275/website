import type { ReactNode } from "react";

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface ToastProps {
  isFadingOut: boolean;
  message?: string;
}

