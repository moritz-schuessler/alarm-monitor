import { NextFunction, Request, Response, Router } from "express";
import incidentService from "../../data/domains/incident/incident.service.js";
import firetruckService from "../../data/domains/firetrucks/firetruck.service.js";

const firetruckRouter = Router();

firetruckRouter.get(
  "/:firetruckId",
  async (request: Request, reponse: Response, next: NextFunction) => {
    const { firetruckId } = request.params;

    const firetruck = await firetruckService.getFiretruckById(firetruckId);

    return reponse.json(firetruck);
  },
);

firetruckRouter.post(
  "/:firetruckId/incident",
  async (request: Request, response: Response) => {
    const { firetruckId } = request.params;
    const { incidentId } = await request.body;

    await incidentService.addFiretruckToIncident(firetruckId, incidentId);

    return response.json({ success: true });
  },
);

firetruckRouter.post(
  "/:firetruckId/firefighter",
  async (request: Request, response: Response) => {
    const { firetruckId } = request.params;
    const { firefighterId } = request.body;

    await firetruckService.addFirefighterToFiretruck(
      firetruckId,
      firefighterId,
    );

    return response.json({ success: true });
  },
);

export default firetruckRouter;
