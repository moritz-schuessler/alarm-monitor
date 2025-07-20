import addToIncident from "@/data/domains/firetrucks/addToIncident";
import { getFiretruckById } from "@/data/domains/firetrucks/getFiretruck";
import { getIncidentById } from "@/data/domains/incident/getIncident";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firetruck = await getFiretruckById(session.firetruckId);

  const incident = await getIncidentById(firetruck!.activeIncident!);

  return NextResponse.json({ incident });
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { incidentId } = await request.json();

  await addToIncident(session.firetruckId, incidentId);

  return NextResponse.json({ success: true });
}
