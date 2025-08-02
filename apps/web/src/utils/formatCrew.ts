import { FiretruckDetails } from "@alarm-monitor/shared/src";

const formatCrew = (crew: NonNullable<FiretruckDetails>["crew"]) => {
  if (!crew?.firefighters) {
    return `0 / 0`;
  }

  const hasLeadership = crew?.firefighters.some((firefighter) => {
    return firefighter.qualificationToFirefighter.some(({ qualification }) => {
      return qualification.name === "Gruppenführer";
    });
  });

  if (hasLeadership) {
    return `1 / ${crew!.firefighters.length - 1}`;
  }

  return `0 / ${crew!.firefighters.length}`;
};

export default formatCrew;
