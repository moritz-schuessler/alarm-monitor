import { getIncidentsFromStation } from "@/data/incident/getIncidents";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const incidents = await getIncidentsFromStation(session.firetruck.stationId);

  return NextResponse.json({ incidents });
}
