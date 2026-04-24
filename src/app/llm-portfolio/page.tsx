import { LLMPerformanceChart } from "@/components/charts/LLMPerformanceChart";
import llmPortfolioData from "@/data/llm-portfolio.json";

export const metadata = {
  title: "LLM Portfolio Experiment | Mark Li",
};

export default function LLMPortfolioPage() {
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

        <LLMPerformanceChart data={llmPortfolioData} />
      </main>
    </div>
  );
}
