import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import incidentService from "@/data/domains/incident/incident.service";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { incidentId } = await request.json();

  await incidentService.addFiretruckToIncident(session.firetruckId, incidentId);

  return NextResponse.json({ success: true });
}
