import { FiretruckDetails } from "@/data/domains/firetrucks/firetruck.types";

const formatCrew = (crew: NonNullable<FiretruckDetails>["crew"]) => {
  if (!crew?.firefighters) {
    return `0 / 0`;
  }

  const hasLeadership = crew?.firefighters.some((firefighter) => {
    return firefighter.qualificationToFirefighter.some((qualifications) => {
      return qualifications.qualification.name === "Gruppenführer";
    });
  });

  if (hasLeadership) {
    return `1 / ${crew!.firefighters.length - 1}`;
  }

  return `0 / ${crew!.firefighters.length}`;
};

export default formatCrew;
