import type { ReactNode } from "react";

export const Subtitle2 = ({ children }: { children: ReactNode }) => {
  return <h1 className="font-semibold text-md underline">{children}</h1>;
};

