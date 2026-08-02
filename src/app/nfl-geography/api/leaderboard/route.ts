import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nflGeographyConfig from '@/config/nflGeography';

export const runtime = 'nodejs';

function formatCentralDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('month')}:${get('day')}:${get('year')}`;
}

function formatCentralTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

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
  const spreadsheetId = nflGeographyConfig.spreadsheetId;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !spreadsheetId || !clientEmail) {
    return null;
  }

  privateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  await auth.authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId };
}

export async function POST(request: NextRequest) {
  try {
    const { name, score } = await request.json();

    if (typeof name !== 'string' || !name.trim() || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'name and score are required' },
        { status: 400 },
      );
    }

    const client = await getSheetsClient();
    if (!client) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 },
      );
    }

    const { sheets, spreadsheetId } = client;
    const now = new Date();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: '2026!A:D',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            name.trim().slice(0, 40),
            score,
            formatCentralDate(now),
            formatCentralTime(now),
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
