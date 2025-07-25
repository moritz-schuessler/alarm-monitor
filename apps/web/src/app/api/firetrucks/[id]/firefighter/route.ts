import firetruckService from "@/data/domains/firetrucks/firetruck.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: firetruckId } = await params;
  const { firefighterId } = await request.json();

  console.log("test");

  await firetruckService.addFirefighterToFiretruck(firetruckId, firefighterId);

  return NextResponse.json({ success: true });
}
