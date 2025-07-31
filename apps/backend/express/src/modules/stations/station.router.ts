import { NextFunction, Request, Response, Router } from "express";
import incidentService from "../../data/domains/incident/incident.service.js";
import stationService from "../../data/domains/stations/station.service.js";

const stationRouter = Router();

stationRouter.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const stations = await stationService.getStations();

    console.log(stations);

    return response.json(stations);
  },
);

stationRouter.get(
  "/:stationId/incidents",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const incidents = await incidentService.getIncidentsFromStation(
        request.params.stationId,
      );
      response.json(incidents);
    } catch (err) {
      next(err);
    }
  },
);

export default stationRouter;
