import express, { Request, Response } from "express";
import sessionServive from "./lib/auth/session.service.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

app.post("/signin", async (req: Request, res: Response) => {
  const radioIdentification = req.body.radioIdentification;

  const access_token = await sessionServive.encrypt({
    firetruckId: "7512dac5-db29-4019-a9c1-174fd76aa15f",
    stationId: "1ae6f9a9-7167-4b01-89c5-49770667d2b5",
  });

  res.send({ access_token });
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
