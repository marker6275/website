import { google } from "googleapis";
import llmPortfolioConfig from "@/config/llmPortfolio";
import type { LLMPortfolioMonth } from "@/types/app/llmPortfolio";
import { parseSheetValues } from "@/lib/llmPortfolio/parseSheetValues";
import { resolveSheetRange } from "@/lib/llmPortfolio/resolveSheetRange";

let sheetsClientPromise: Promise<{
  sheets: ReturnType<typeof google.sheets>;
  spreadsheetId: string;
} | null> | null = null;

async function getSheetsClient() {
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

  privateKey = privateKey.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  await auth.authorize();
  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, spreadsheetId };
}

export async function fetchLLMPortfolioData(): Promise<LLMPortfolioMonth[]> {
  const client = await getSheetsClient();
  if (!client) {
    throw new Error("Missing environment variables");
  }

  const { sheets, spreadsheetId } = client;

  const range = await resolveSheetRange(
    sheets,
    spreadsheetId,
    llmPortfolioConfig.range,
    llmPortfolioConfig.sheetGid,
  );

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return parseSheetValues(result.data.values ?? []);
}
