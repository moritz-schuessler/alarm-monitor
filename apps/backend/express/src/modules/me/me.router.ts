import { NextFunction, Request, Response, Router } from "express";
import sessionService from "../../lib/auth/session.service.js";
import firetruckService from "../../data/domains/firetrucks/firetruck.service.js";
import stationService from "../../data/domains/stations/station.service.js";

const meRouter = Router();

meRouter.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // Token aus HttpOnly-Cookie auslesen
      const token = request.cookies.session as string | undefined;
      const session = await sessionService.decrypt(token);
      if (!session) {
        return response.status(401).json({ error: "Unauthorized" });
      }

      // Parallel Firetruck + Station laden
      const [firetruck, station] = await Promise.all([
        firetruckService.getFiretruckById(session.firetruckId),
        stationService.getStationById(session.stationId),
      ]);

      return response.json({ firetruck: firetruck, station: station });
    } catch (err) {
      next(err);
    }
  },
);

export default meRouter;
