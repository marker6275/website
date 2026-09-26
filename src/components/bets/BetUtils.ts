import type { BetRow, BetSortMode, BetSortStats } from "@/types/components";

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

const LINE_NUMBER =
  /^([+-]?\d+(\.\d+)?\+?|\d+:\d+|\d+(st|nd|rd|th|Q)|[OU]\d+(\.\d+)?)$/;
const LINE_KEYWORDS = new Set([
  "ml",
  "anytime",
  "double-double",
  "triple-double",
  "podium",
  "to",
  "by",
  "win",
  "finals",
  "first",
  "drafted",
  "drafed",
  "before",
  "nba",
  "aus",
  "race",
  "coin",
  "longest",
  "each",
  "spread",
  "puck",
  "regular",
  "combined",
  "or",
  "-",
]);
const IGNORED_INDIVIDUALS =
  /^(any|yes|under|over|offensive lineman|super bowl)\b/i;

function isLineMarker(word: string): boolean {
  return LINE_NUMBER.test(word) || LINE_KEYWORDS.has(word.toLowerCase());
}

// Pulls the players/teams out of a single leg, e.g. "Drake Maye & Sam Darnold
// Each 15+ Passing Yards" -> ["Drake Maye", "Sam Darnold"], and both sides of
// a score pick like "Duke 74:69 UConn".
export function getLegIndividuals(leg: string): string[] {
  const words = leg.trim().split(/\s+/);
  const markerIndex = words.findIndex(isLineMarker);
  if (markerIndex <= 0) {
    return [];
  }

  const subjects = [words.slice(0, markerIndex).join(" ")];
  if (/^\d+:\d+$/.test(words[markerIndex])) {
    const rest = words.slice(markerIndex + 1);
    const endIndex = rest.findIndex(isLineMarker);
    subjects.push(
      rest.slice(0, endIndex === -1 ? undefined : endIndex).join(" "),
    );
  }

  return subjects
    .flatMap((subject) => subject.split(/\s*\+\s*|\s+&\s+/))
    .map((subject) => subject.trim())
    .filter((subject) => subject && !IGNORED_INDIVIDUALS.test(subject));
}

export function splitLines(cell: unknown): string[] {
  return String(cell || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
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

export const betSortOptions: { value: BetSortMode; label: string }[] = [
  { value: "profit", label: "Profit" },
  { value: "spent", label: "Total Spent" },
  { value: "winrate", label: "Winrate" },
  { value: "settled", label: "Settled Bets" },
];

// Each sort falls back to the next key on a tie
const betSortOrder: Record<BetSortMode, BetSortMode[]> = {
  profit: ["profit", "winrate", "settled", "spent"],
  spent: ["spent", "profit", "winrate", "settled"],
  winrate: ["winrate", "profit", "settled", "spent"],
  settled: ["settled", "profit", "winrate", "spent"],
};

function getBetSortValue(stats: BetSortStats, mode: BetSortMode): number {
  switch (mode) {
    case "spent":
      return Math.round(stats.totalSpent * 100);
    case "winrate":
      return stats.settled > 0 ? stats.won / stats.settled : -1;
    case "settled":
      return stats.settled;
    default:
      return Math.round(stats.netProfit * 100);
  }
}

export function compareBetStats(
  a: BetSortStats,
  b: BetSortStats,
  sortMode: BetSortMode,
): number {
  return (
    betSortOrder[sortMode].reduce(
      (result, mode) =>
        result || getBetSortValue(b, mode) - getBetSortValue(a, mode),
      0,
    ) || a.name.localeCompare(b.name)
  );
}
