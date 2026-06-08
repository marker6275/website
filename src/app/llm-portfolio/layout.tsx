import type { ReactNode } from "react";

export const metadata = {
  title: "LLM Portfolio Experiment | Mark Li",
};

export default function LLMPortfolioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
