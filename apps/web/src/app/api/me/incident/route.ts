import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import firetruckService from "@/data/domains/firetrucks/firetruck.service";
import incidentService from "@/data/domains/incident/incident.service";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firetruck = await firetruckService.getFiretruckById(
    session.firetruckId,
  );

  const incident = await incidentService.getIncidentDetails(
    firetruck!.activeIncident!,
  );

  return NextResponse.json({ incident });
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { incidentId } = await request.json();

  await incidentService.addFiretruckToIncident(session.firetruckId, incidentId);

  return NextResponse.json({ success: true });
}
