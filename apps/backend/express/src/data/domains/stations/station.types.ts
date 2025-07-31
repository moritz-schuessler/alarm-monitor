import stationService from "./station.service";

type StationDetails = Awaited<ReturnType<typeof stationService.getStationById>>;
type StationsDetails = Awaited<ReturnType<typeof stationService.getStations>>;

export { type StationDetails, type StationsDetails };
