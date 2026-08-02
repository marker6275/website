import fs from "fs";
import path from "path";

export type NflGeographyTeam = {
  id: string;
  name: string;
  x: number | null;
  y: number | null;
};

const DATA_PATH = path.join(
  process.cwd(),
  "src/data/nflGeographyTeams.json",
);

export function readTeams(): NflGeographyTeam[] {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

export function writeTeamPosition(
  id: string,
  x: number,
  y: number,
): NflGeographyTeam | null {
  const teams = readTeams();
  const team = teams.find((t) => t.id === id);
  if (!team) return null;

  team.x = x;
  team.y = y;
  fs.writeFileSync(DATA_PATH, JSON.stringify(teams, null, 2) + "\n");
  return team;
}
