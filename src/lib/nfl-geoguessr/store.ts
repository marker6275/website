import fs from "fs";
import path from "path";

export type NflGeoguessrTeam = {
  id: string;
  name: string;
  x: number | null;
  y: number | null;
};

const DATA_PATH = path.join(
  process.cwd(),
  "src/data/nflGeoguessrTeams.json",
);

export function readTeams(): NflGeoguessrTeam[] {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}
