import { NextResponse } from "next/server";
import { google } from "googleapis";
import { BetResults } from "../../../components/bets";

export const runtime = "nodejs";

function getDate(date) {
  let month = date.slice(0, 2);
  let day = date.slice(-2);

  if (month[0] === "0") {
    month = month.slice(-1);
  }

  if (day[0] === "0") {
    day = day.slice(-1);
  }

  return month + "/" + day;
}

function parseBetAmount(betAmount) {
  return `$${betAmount.toFixed(2)}`;
}

function parseOdds(odds) {
  return odds > 0 ? `+${odds}` : odds;
}

function parsePayout(betAmount, odds, result) {
  if ((result === BetResults.Won || result === BetResults.Open) && odds > 0) {
    return `$${(betAmount + betAmount * (odds / 100)).toFixed(2)}`;
  } else if (
    (result === BetResults.Won || result === BetResults.Open) &&
    odds < 0
  ) {
    console.log(odds, typeof odds, odds < 0, odds * -1);
    return `$${(betAmount + betAmount * (100 / (odds * -1))).toFixed(2)}`;
  } else if (result === BetResults.Lost || result === BetResults.Cashed) {
    return "$0.00";
  }

  return "$0.00";
}

function parseValues(values) {
  const dataValues = values[0];

  const date = getDate(dataValues[0].slice(-5));

  const betAmountAsNumber = parseFloat(dataValues[1]);
  const betAmount = parseBetAmount(betAmountAsNumber);

  const oddsAsNumber = parseFloat(dataValues[2]);
  const odds = parseOdds(oddsAsNumber);

  const result = dataValues[3];

  const payout = parsePayout(betAmountAsNumber, oddsAsNumber, result);

  const leagues = dataValues[5];

  const line = dataValues[6];

  return [[date, betAmount, odds, result, payout, leagues, line]];
}

export async function POST(request) {
  try {
    const { values } = await request.json();

    const parsedValues = parseValues(values);
    console.log(values);
    console.log(parsedValues);

    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

    privateKey = privateKey.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

    const credentials = {
      type: "service_account",
      client_email: clientEmail,
      private_key: privateKey,
    };

    const auth = google.auth.fromJSON(credentials);
    auth.scopes = ["https://www.googleapis.com/auth/spreadsheets"];

    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: "Bets!A:G",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: parsedValues },
    });

    const updatedRows = result.data.updates?.updatedRows ?? 0;
    return NextResponse.json({ updatedRows });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
