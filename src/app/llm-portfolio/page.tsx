import { LLMPerformanceChart } from "@/components/charts/LLMPerformanceChart";
import { fetchLLMPortfolioData } from "@/lib/llmPortfolio/fetchPortfolioData";
import { LLMPortfolioMonth } from "@/types/app";

export const revalidate = 300;

export default async function LLMPortfolioPage() {
  let error: string | null = null;
  let data: LLMPortfolioMonth[] = [];

  try {
    data = await fetchLLMPortfolioData();
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            LLM Portfolio Experiment
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Individualized portfolio performance of various LLMs, compared
            against the S&P 500
          </p>
        </section>

        {error ? (
          <p className="text-sm text-red-600">
            Failed to load portfolio data: {error}
          </p>
        ) : data.length === 0 ? (
          <p className="text-sm text-slate-600">No portfolio data found.</p>
        ) : (
          <LLMPerformanceChart data={data} />
        )}
      </main>
    </div>
  );
}
