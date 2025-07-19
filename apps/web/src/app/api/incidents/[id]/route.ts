import { getIncidentById } from "@/data/incident/getIncident";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const incident = await getIncidentById(id);

  return NextResponse.json(incident);
};

export { GET };
