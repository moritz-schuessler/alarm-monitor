import stationService from "./station.service";

type StationDetails = Awaited<ReturnType<typeof stationService.getStationById>>;

export { type StationDetails };
