import type { sheets_v4 } from "googleapis";

const resolvedRangeCache = new Map<string, string>();

function formatSheetRange(sheetTitle: string, columnRange: string): string {
  const escapedTitle = sheetTitle.replace(/'/g, "''");
  return `'${escapedTitle}'!${columnRange}`;
}

export async function resolveSheetRange(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  columnRange: string,
  sheetGid?: string,
): Promise<string> {
  if (columnRange.includes("!")) {
    return columnRange;
  }

  if (!sheetGid) {
    return columnRange;
  }

  const cacheKey = `${spreadsheetId}:${sheetGid}:${columnRange}`;
  const cachedRange = resolvedRangeCache.get(cacheKey);
  if (cachedRange) {
    return cachedRange;
  }

  const gid = Number.parseInt(sheetGid, 10);
  if (!Number.isFinite(gid)) {
    throw new Error(`Invalid sheet gid: ${sheetGid}`);
  }

  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties",
  });

  const sheet = metadata.data.sheets?.find(
    (entry) => entry.properties?.sheetId === gid,
  );
  const sheetTitle = sheet?.properties?.title;

  if (!sheetTitle) {
    throw new Error(`Sheet with gid ${gid} not found`);
  }

  const resolvedRange = formatSheetRange(sheetTitle, columnRange);
  resolvedRangeCache.set(cacheKey, resolvedRange);
  return resolvedRange;
}
