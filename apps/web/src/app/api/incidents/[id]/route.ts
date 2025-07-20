import incidentService from "@/data/domains/incident/incident.service";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const incident = await incidentService.getIncidentDetails(id);

  return NextResponse.json(incident);
};

export { GET };
