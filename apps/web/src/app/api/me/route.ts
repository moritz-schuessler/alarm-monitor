import { getFiretruckById } from "@/data/domains/firetrucks/getFiretruck";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const firetruck = await getFiretruckById(session.firetruckId);

  console.log(firetruck);

  return NextResponse.json({ firetruck });
}
