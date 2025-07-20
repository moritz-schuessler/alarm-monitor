import firetruckService from "@/data/domains/firetrucks/firetruck.service";
import incidentService from "@/data/domains/incident/incident.service";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firetruck = await firetruckService.getFiretruckById(
    session.firetruckId,
  );

  const incidents = await incidentService.getIncidentsFromStation(
    firetruck!.stationId,
  );

  return NextResponse.json(incidents);
}
