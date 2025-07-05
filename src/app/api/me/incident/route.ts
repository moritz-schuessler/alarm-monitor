import addToIncident from "@/data/firetrucks/addToIncident";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { incidentId } = await request.json();

  await addToIncident(session.firetruckId, incidentId);

  return NextResponse.json({ success: true });
}
