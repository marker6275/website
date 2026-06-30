import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import llmPortfolioConfig from '@/config/llmPortfolio';
import stocks from '@/data/stocks.json';
import type { LLMPortfolioMonth } from '@/types/app/llmPortfolio';

export const runtime = 'nodejs';

const VALID_TICKERS = new Set(Object.keys(stocks));

const STRATEGY_KEY_MAP: Record<string, string> = {
  chatgpt: 'chatGPT',
  claude: 'claude',
  grok: 'grok',
  deepseek: 'deepseek',
  spy: 'spy',
};

const HOLDINGS_ROWS_PER_BLOCK = 10;
const BLOCK_SIZE = 13;

let sheetsClientPromise: Promise<{
  sheets: ReturnType<typeof google.sheets>;
  spreadsheetId: string;
} | null> | null = null;

function getSheetsClient() {
  if (!sheetsClientPromise) {
    sheetsClientPromise = createSheetsClient();
  }

  return sheetsClientPromise;
}

async function createSheetsClient() {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = llmPortfolioConfig.spreadsheetId;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !spreadsheetId || !clientEmail) {
    return null;
  }

  privateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  await auth.authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId };
}

function parseReturnValue(raw: unknown): number {
  const normalized = String(raw).trim().replace(/%$/, '');
  const value = parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}

function createEmptyHoldings(strategyKeys: string[]): Record<string, string[]> {
  return strategyKeys.reduce<Record<string, string[]>>((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
}

export function parseSheetValues(values: string[][]): LLMPortfolioMonth[] {
  const strategyKeys = values[0]
    .slice(0, 5)
    .map((header) => STRATEGY_KEY_MAP[header.trim().toLowerCase()]);

  const months: LLMPortfolioMonth[] = [];
  let currentMonth: string | null = null;
  let currentHoldings = createEmptyHoldings(strategyKeys);

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const rowNumber = rowIndex + 1;
    const mod = rowNumber % BLOCK_SIZE;
    const row = values[rowIndex] ?? [];
    let numberOfReturnValues = 0;

    if (mod === 2) {
      currentMonth = row[0].trim();
      currentHoldings = createEmptyHoldings(strategyKeys);
    }

    if (mod === 0) {
      if (!currentMonth) {
        continue;
      }

      const monthEntry: LLMPortfolioMonth = { month: currentMonth };
      strategyKeys.entries().forEach(([columnIndex, strategyKey]) => {
        const returnValue = parseReturnValue(row[columnIndex]);
        if (!returnValue) {
          return;
        }

        monthEntry[strategyKey] = {
          return: returnValue,
          stocks: currentHoldings[strategyKey],
        };

        numberOfReturnValues++;
      });

      months.push(monthEntry);
      currentMonth = null;
      currentHoldings = createEmptyHoldings(strategyKeys);
    }

    if (mod >= 3 && mod <= 3 + HOLDINGS_ROWS_PER_BLOCK - 1) {
      strategyKeys.entries().forEach(([columnIndex, strategyKey]) => {
        const ticker = String(row[columnIndex] ?? '').trim();
        if (ticker && !VALID_TICKERS.has(ticker) && numberOfReturnValues == 5) {
          throw new Error(
            `Unknown ticker "${ticker}" for ${strategyKey} in ${currentMonth ?? 'unknown month'}: not present in stocks.json.`,
          );
        }
        currentHoldings[strategyKey].push(ticker);
      });
    }
  }

  return months;
}

export async function fetchLLMPortfolioData(): Promise<LLMPortfolioMonth[]> {
  const client = await getSheetsClient();
  if (!client || !llmPortfolioConfig.range) {
    throw new Error('Missing environment variables');
  }

  const { sheets, spreadsheetId } = client;
  const range = llmPortfolioConfig.range;

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return parseSheetValues(result.data.values ?? []);
}

export async function GET() {
  try {
    const data = await fetchLLMPortfolioData();

    return NextResponse.json(
      { data },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
