import type { ReactNode } from "react";

export const NumberList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="pl-10 list-decimal list-outside font-light">{children}</ul>
  );
};

export const BulletList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="pl-10 list-disc list-outside font-light">{children}</ul>
  );
};

