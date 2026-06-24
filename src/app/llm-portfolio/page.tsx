import { LLMPerformanceChart } from '@/components/charts/LLMPerformanceChart';
import { fetchLLMPortfolioData } from '@/app/llm-portfolio/api/route';
import { LLMPortfolioMonth } from '@/types/app';

export const revalidate = 60;

export default async function LLMPortfolioPage() {
  let hasError = false;
  let data: LLMPortfolioMonth[] = [];

  try {
    data = await fetchLLMPortfolioData();
  } catch {
    hasError = true;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            LLM Portfolio Experiment
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Individualized portfolio performance of various LLMs, compared
            against the S&P 500
          </p>
        </div>

        {hasError ? (
          <div
            role="alert"
            className="rounded-lg border-l-4 border-red-500 bg-red-50 px-6 py-5"
          >
            <p className="text-base font-medium text-red-700">
              Unable to load portfolio data right now
            </p>
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-slate-600">No portfolio data found.</p>
        ) : (
          <LLMPerformanceChart data={data} />
        )}
      </main>
    </div>
  );
}
