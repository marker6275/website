import type { BetRow } from "@/types/components";

export const BetResults = {
  Won: "Won",
  Lost: "Lost",
  Cashed: "Cashed",
  Open: "Open",
} as const;

export function getCompletedBets(bets: BetRow[]): BetRow[] {
  return bets.filter((bet) => bet[3] !== BetResults.Open);
}

export function getBetSports(bet: any[]): string[] {
  return String(bet[5] || "")
    .split(",")
    .map((sport) => sport.trim())
    .filter(Boolean);
}

export function getBetWagerAmount(bet: any[]): number {
  return parseFloat(String(bet[1] || "0").replace(/^\$/, ""));
}

export const leagueOptions = [
  "CBB",
  "CFB",
  "MLB",
  "NBA",
  "NFL",
  "NHL",
  "Tennis",
  "UFC",
  "WNBA",
];
