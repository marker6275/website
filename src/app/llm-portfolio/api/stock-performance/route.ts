import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const YAHOO_CHART_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';
const YAHOO_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const DAY_IN_SECONDS = 24 * 60 * 60;

function toYahooSymbol(ticker: string): string {
  return ticker.replace(/\./g, '-');
}

function toUnixSeconds(dateStr: string): number {
  return Math.floor(new Date(`${dateStr}T00:00:00Z`).getTime() / 1000);
}

async function fetchTickerReturn(
  ticker: string,
  period1: number,
  period2: number,
): Promise<number | null> {
  const symbol = toYahooSymbol(ticker);
  const url = `${YAHOO_CHART_URL}/${encodeURIComponent(symbol)}?period1=${period1}&period2=${period2}&interval=1d`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': YAHOO_USER_AGENT },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    const result = json?.chart?.result?.[0];
    const closes: unknown[] = result?.indicators?.quote?.[0]?.close ?? [];

    const validCloses = closes.filter(
      (value): value is number =>
        typeof value === 'number' && Number.isFinite(value),
    );

    if (validCloses.length < 2) {
      return null;
    }

    const first = validCloses[0];
    const last = validCloses[validCloses.length - 1];

    if (!first) {
      return null;
    }

    return ((last - first) / first) * 100;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tickersParam = searchParams.get('tickers') ?? '';
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  const tickers = Array.from(
    new Set(
      tickersParam
        .split(',')
        .map((ticker) => ticker.trim())
        .filter(Boolean),
    ),
  );

  if (tickers.length === 0 || !start || !end) {
    return NextResponse.json({ data: {} });
  }

  const period1 = toUnixSeconds(start);
  const period2 = toUnixSeconds(end) + DAY_IN_SECONDS;

  const entries = await Promise.all(
    tickers.map(
      async (ticker) =>
        [ticker, await fetchTickerReturn(ticker, period1, period2)] as const,
    ),
  );

  return NextResponse.json(
    { data: Object.fromEntries(entries) },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    },
  );
}
