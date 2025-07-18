import db from "..";

const getStationById = async (stationId: string) => {
  db.query.stations.findFirst({
    where: (station, { eq }) => eq(station.id, stationId),
  });
};

export { getStationById };
