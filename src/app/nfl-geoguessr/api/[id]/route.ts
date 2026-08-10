import { NextRequest, NextResponse } from "next/server";
import { writeTeamPosition } from "@/lib/nfl-geoguessr/store";
import { MAP_WIDTH, MAP_HEIGHT } from "@/lib/nfl-geoguessr/constants";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const { x, y } = body;

  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    x < 0 ||
    y < 0 ||
    x > MAP_WIDTH ||
    y > MAP_HEIGHT
  ) {
    return NextResponse.json(
      { error: "x and y must be numbers within map bounds" },
      { status: 400 },
    );
  }

  const updated = writeTeamPosition(id, x, y);
  if (!updated) {
    return NextResponse.json({ error: "team not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
