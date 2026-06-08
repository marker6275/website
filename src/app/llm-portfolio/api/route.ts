import { NextResponse } from "next/server";
import { fetchLLMPortfolioData } from "@/lib/llmPortfolio/fetchPortfolioData";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await fetchLLMPortfolioData();

    return NextResponse.json(
      { data },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
