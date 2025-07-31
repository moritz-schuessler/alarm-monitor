import { JWTPayload, jwtVerify, SignJWT } from "jose";

const SECRET = process.env.SESSION_SECRET;

if (!SECRET) {
  throw new Error("SESSION_SECRET is not defined in env");
}

const ENCODED_KEY = new TextEncoder().encode(SECRET);

type Payload = {
  firetruckId: string;
  stationId: string;
};

type Session = Payload & JWTPayload;

const sessionService = {
  async encrypt(payload: Payload): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(ENCODED_KEY);
  },

  async decrypt(token?: string): Promise<Session | null> {
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, ENCODED_KEY, {
        algorithms: ["HS256"],
      });
      return payload as Session;
    } catch (error) {
      console.log("Failed to verify session", error);
      return null;
    }
  },
};

export default sessionService;
