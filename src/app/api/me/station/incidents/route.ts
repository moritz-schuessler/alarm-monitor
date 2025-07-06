import { getFiretruckById } from "@/data/firetrucks/getFiretruck";
import { getIncidentsFromStation } from "@/data/incident/getIncidents";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firetruck = await getFiretruckById(session.firetruckId);

  const incidents = await getIncidentsFromStation(firetruck!.stationId);

  return NextResponse.json(incidents);
}
