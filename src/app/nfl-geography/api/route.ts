import { NextResponse } from "next/server";
import { readTeams } from "@/lib/nfl-geography/store";

export const runtime = "nodejs";

export async function GET() {
  const teams = [...readTeams()].sort((a, b) => a.name.localeCompare(b.name));
  return NextResponse.json(teams);
}
