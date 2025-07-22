import firetruckService from "@/data/domains/firetrucks/firetruck.service";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const firetruck = await firetruckService.getFiretruckById(id);

  return NextResponse.json(firetruck);
};

export { GET };
