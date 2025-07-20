import db from "../../database";

const getStations = async () => {
  const result = await db.query.stations.findMany({
    with: {
      firetrucks: true,
    },
  });

  return result;
};

export default getStations;
