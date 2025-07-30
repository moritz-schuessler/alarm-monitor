import { NextFunction, Request, Response, Router } from "express";
import incidentService from "../../data/domains/incident/incident.service.js";

const incidentRouter = Router();

incidentRouter.get(
  "/:incidentId",
  async (request: Request, response: Response, next: NextFunction) => {
    const { incidentId } = request.params;

    const incident = await incidentService.getIncidentDetails(incidentId);

    return response.json(incident);
  },
);

export default incidentRouter;
