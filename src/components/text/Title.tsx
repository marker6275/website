import type { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-5xl mb-5">{children}</h1>;
};

