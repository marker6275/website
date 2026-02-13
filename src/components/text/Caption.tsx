import type { ReactNode } from "react";

export const Caption = ({ children }: { children: ReactNode }) => {
  return (
    <p className="flex items-center justify-center font-medium">{children}</p>
  );
};

