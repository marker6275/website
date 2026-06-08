import type { LLMPortfolioMonth } from "@/types/app/llmPortfolio";

const STRATEGY_KEY_MAP: Record<string, string> = {
  chatgpt: "chatGPT",
  claude: "claude",
  grok: "grok",
  deepseek: "deepseek",
  spy: "spy",
};

const HOLDINGS_ROWS_PER_BLOCK = 10;
const BLOCK_SIZE = 13;

function normalizeStrategyKey(header: string): string {
  const trimmed = header.trim();
  if (!trimmed) {
    return trimmed;
  }

  return STRATEGY_KEY_MAP[trimmed.toLowerCase()] ?? trimmed;
}

function parseReturnValue(raw: unknown): number {
  const normalized = String(raw ?? "")
    .trim()
    .replace(/%$/, "");
  const value = parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}

function getStrategyKeys(headerRow: string[]): string[] {
  return headerRow
    .slice(0, 5)
    .map((header) => normalizeStrategyKey(String(header ?? "")))
    .filter(Boolean);
}

function createEmptyHoldings(strategyKeys: string[]): Record<string, string[]> {
  return strategyKeys.reduce<Record<string, string[]>>((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
}

export function parseSheetValues(values: string[][]): LLMPortfolioMonth[] {
  if (values.length < 2) {
    return [];
  }

  const strategyKeys = getStrategyKeys(values[0] ?? []);
  if (strategyKeys.length === 0) {
    return [];
  }

  const months: LLMPortfolioMonth[] = [];
  let currentMonth: string | null = null;
  let currentHoldings = createEmptyHoldings(strategyKeys);

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const rowNumber = rowIndex + 1;
    const mod = rowNumber % BLOCK_SIZE;
    const row = values[rowIndex] ?? [];

    if (mod === 1) {
      continue;
    }

    if (mod === 2) {
      currentMonth = String(row[0] ?? "").trim();
      currentHoldings = createEmptyHoldings(strategyKeys);
      continue;
    }

    if (mod >= 3 && mod <= 3 + HOLDINGS_ROWS_PER_BLOCK - 1) {
      if (!currentMonth) {
        continue;
      }

      for (const [columnIndex, strategyKey] of strategyKeys.entries()) {
        const ticker = String(row[columnIndex] ?? "").trim();
        if (ticker) {
          currentHoldings[strategyKey].push(ticker);
        }
      }
      continue;
    }

    if (mod === 0) {
      if (!currentMonth) {
        continue;
      }

      const monthEntry: LLMPortfolioMonth = { month: currentMonth };

      for (const [columnIndex, strategyKey] of strategyKeys.entries()) {
        const stocks =
          strategyKey === "spy" && currentHoldings[strategyKey].length === 0
            ? ["SPY"]
            : currentHoldings[strategyKey];

        monthEntry[strategyKey] = {
          return: parseReturnValue(row[columnIndex]),
          stocks,
        };
      }

      months.push(monthEntry);
      currentMonth = null;
      currentHoldings = createEmptyHoldings(strategyKeys);
    }
  }

  return months;
}
