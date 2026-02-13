import type { ReactNode } from "react";

export const Date = ({ children }: { children: ReactNode }) => {
  return (
    <p className="absolute right-3 top-1 font-light text-sm">{children}</p>
  );
};

