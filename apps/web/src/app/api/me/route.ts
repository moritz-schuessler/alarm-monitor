import firetruckService from "@/data/domains/firetrucks/firetruck.service";
import stationService from "@/data/domains/stations/station.service";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const GET = async () => {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [firetruck, station] = await Promise.all([
      firetruckService.getFiretruckById(session.firetruckId),
      stationService.getStationById(session.stationId),
    ]);

    return NextResponse.json({ firetruck, station });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export { GET };
