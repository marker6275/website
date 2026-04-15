export interface LLMPortfolioMonth {
  month: string;
  chatGPT_return: number;
  claude_return: number;
  grok_return: number;
  deepseek_return: number;
  spy_return: number;
  chatGPT_stocks: string[];
  claude_stocks: string[];
  grok_stocks: string[];
  deepseek_stocks: string[];
  spy_stocks: string[];
}
