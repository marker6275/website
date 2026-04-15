export interface MonthlyPortfolioReturn {
  month: string;
  gpt_return: number;
  claude_return: number;
  gemini_return: number;
  spy_return: number;
}

export interface MonthlyPortfolioWithIndex extends MonthlyPortfolioReturn {
  gpt_index: number;
  claude_index: number;
  gemini_index: number;
  spy_index: number;
}

type StrategyKey = "gpt" | "claude" | "gemini" | "spy";

const strategyKeys: StrategyKey[] = ["gpt", "claude", "gemini", "spy"];

const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100;

export function computeCumulativeReturns(
  data: MonthlyPortfolioReturn[],
): MonthlyPortfolioWithIndex[] {
  const runningIndex: Record<StrategyKey, number> = {
    gpt: 100,
    claude: 100,
    gemini: 100,
    spy: 100,
  };

  return data.map((row) => {
    for (const strategy of strategyKeys) {
      const monthlyReturn = row[`${strategy}_return` as const];
      runningIndex[strategy] *= 1 + monthlyReturn / 100;
    }

    return {
      ...row,
      gpt_index: roundToTwoDecimals(runningIndex.gpt),
      claude_index: roundToTwoDecimals(runningIndex.claude),
      gemini_index: roundToTwoDecimals(runningIndex.gemini),
      spy_index: roundToTwoDecimals(runningIndex.spy),
    };
  });
}
