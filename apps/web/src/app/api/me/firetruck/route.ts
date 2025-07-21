import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

import firetruckService from "@/data/domains/firetrucks/firetruck.service";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firetruck = await firetruckService.getFiretruckById(
    session.firetruckId,
  );

  return NextResponse.json({ firetruck });
}
