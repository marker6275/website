import { LLMPortfolioMonth } from "@/types/app";

export interface LLMPortfolioStrategy {
  return: number;
  stocks: string[];
}

export type StrategyKey = string;
export interface StrategyConfig {
  key: StrategyKey;
  label: string;
  color: string;
  barColor: string;
}

export interface PortfolioRow {
  month: string;
  strategyData: Record<string, LLMPortfolioStrategy>;
  [key: string]: string | number | Record<string, LLMPortfolioStrategy>;
}

export interface LLMPerformanceChartProps {
  data: LLMPortfolioMonth[];
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: PortfolioRow }>;
  label?: string;
  activeStrategies: StrategyConfig[];
}
