import firetruckService from "./firetruck.service";

type FiretruckDetails = Awaited<
  ReturnType<typeof firetruckService.getFiretruckById>
>;

type CrewDetails = NonNullable<FiretruckDetails>["crew"];
type FirefighterDetails = NonNullable<CrewDetails>["firefighters"][number];

export { type FiretruckDetails, type CrewDetails, type FirefighterDetails };
