import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import sessionService from "./lib/auth/session.service.js";
import firetruckService from "./data/domains/firetrucks/firetruck.service.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

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
