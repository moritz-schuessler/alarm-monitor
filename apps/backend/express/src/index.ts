import express, { Request, Response, Router } from "express";
import cookieParser from "cookie-parser";
import sessionService from "./lib/auth/session.service.js";
import firetruckService from "./data/domains/firetrucks/firetruck.service.js";
import meRouter from "./modules/me/me.router.js";
import stationRouter from "./modules/stations/station.router.js";
import firetruckRouter from "./modules/firetrucks/firetruck.router.js";
import incidentRouter from "./modules/incidents/incident.router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const apiRouter = Router();

app.use("/api", apiRouter);

apiRouter.use("/me", meRouter);
apiRouter.use("/stations", stationRouter);
apiRouter.use("/firetrucks", firetruckRouter);
apiRouter.use("/incidents", incidentRouter);

app.post("/signin", async (req: Request, res: Response) => {
  const radioIdentification = req.body.radioIdentification;

  const firetruck =
    await firetruckService.getFiretruckByRadioIdentification(
      radioIdentification,
    );

  const access_token = await sessionService.encrypt({
    firetruckId: firetruck!.id,
    stationId: firetruck!.stationId,
  });

  res.send({ access_token });
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
