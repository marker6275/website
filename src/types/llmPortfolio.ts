export interface LLMPortfolioStrategy {
  return: number;
  stocks: string[];
}

export interface LLMPortfolioMonth {
  month: string;
  chatGPT: LLMPortfolioStrategy;
  claude: LLMPortfolioStrategy;
  grok: LLMPortfolioStrategy;
  deepseek: LLMPortfolioStrategy;
  spy: LLMPortfolioStrategy;
}
