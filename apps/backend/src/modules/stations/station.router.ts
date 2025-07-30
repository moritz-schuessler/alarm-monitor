import { NextFunction, Request, Response, Router } from "express";
import incidentService from "../../data/domains/incident/incident.service.js";

const stationRouter = Router();

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
