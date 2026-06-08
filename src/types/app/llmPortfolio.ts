import { LLMPortfolioStrategy } from "@/types/components/charts";

export interface LLMPortfolioMonth {
  month: string;
  [strategyKey: string]: string | LLMPortfolioStrategy;
}
