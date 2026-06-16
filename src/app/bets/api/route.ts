import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import betsConfig from '@/config/bets';

export const runtime = 'nodejs';

function getDate(date: string): string {
  let month = date.slice(0, 2);
  let day = date.slice(-2);

  if (month[0] === '0') {
    month = month.slice(-1);
  }

  if (day[0] === '0') {
    day = day.slice(-1);
  }

  return month + '/' + day;
}

function parseBetAmount(betAmount: number): string {
  return `$${betAmount.toFixed(2)}`;
}

function parseOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : String(odds);
}

function payoutFromSheetCell(raw: string): string | null {
  const payout = parseFloat(raw.trim().replace(/^\$/, ''));
  return `$${payout.toFixed(2)}`;
}

function parseValues(values: any[]): string[][] {
  const date = getDate(values[0].slice(-5));

  const betAmountAsNumber = parseFloat(values[1]);
  const betAmount = parseBetAmount(betAmountAsNumber);

  const oddsAsNumber = parseFloat(values[2]);
  const odds = parseOdds(oddsAsNumber);

  const result = values[3];

  const payoutAsNumber = values[4];
  const payout = payoutFromSheetCell(payoutAsNumber);

  const leagues = values[5];

  const line = values[6];

  return [[date, betAmount, odds, result, payout, leagues, line]];
}

async function getSheetsClient() {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = betsConfig.spreadsheetId;
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

export async function GET() {
  try {
    const client = await getSheetsClient();
    if (!client) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 },
      );
    }

    const { sheets, spreadsheetId } = client;

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Bets!A:G',
    });

    const values = result.data.values || [];
    return NextResponse.json({ values });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { values, update, password } = await request.json();

    if (password !== process.env.PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await getSheetsClient();
    if (!client) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 },
      );
    }

    const { sheets, spreadsheetId } = client;

    if (!update) {
      const parsedValues = parseValues(values);

      await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: 'Bets!A:G',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: parsedValues },
      });
    } else {
      const data: any[] = [];
      for (const value of values) {
        const rowNum = value[7];

        data.push({
          range: `Bets!A${rowNum}:G${rowNum}`,
          majorDimension: 'ROWS',
          values: [value.slice(0, 7)],
        });
      }

      const batchUpdate = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: spreadsheetId,
        requestBody: { valueInputOption: 'RAW', data },
      });

      return NextResponse.json({
        updated: batchUpdate.data.totalUpdatedRows ?? data.length,
        responses: batchUpdate.data.responses,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
