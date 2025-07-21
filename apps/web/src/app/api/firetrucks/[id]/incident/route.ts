import { NextRequest, NextResponse } from "next/server";

import incidentService from "@/data/domains/incident/incident.service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: firetruckId } = await params;
  const { incidentId } = await request.json();

  await incidentService.addFiretruckToIncident(firetruckId, incidentId);

  return NextResponse.json({ success: true });
}
