import { Request, Response, Router } from "express";
import incidentService from "../../data/domains/incident/incident.service.js";

const firetruckRouter = Router();

firetruckRouter.post(
  "/:firetruckId/incident",
  async (request: Request, response: Response) => {
    const { firetruckId } = request.params;
    const { incidentId } = await request.body;

    await incidentService.addFiretruckToIncident(firetruckId, incidentId);

    return response.json({ success: true });
  },
);

export default firetruckRouter;
