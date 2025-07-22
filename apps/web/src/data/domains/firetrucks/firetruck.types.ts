import firetruckService from "./firetruck.service";

type FiretruckDetails = Awaited<
  ReturnType<typeof firetruckService.getFiretruckById>
>;

export { type FiretruckDetails };
