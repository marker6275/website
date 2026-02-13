import type { ReactNode } from "react";

export const Subtitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-2xl pb-2 pt-5">{children}</h1>;
};

