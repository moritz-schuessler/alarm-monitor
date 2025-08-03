import {
  CrewEntity,
  FirefighterEntity,
  FiretruckEntity,
  IncidentEntity,
  StationEntity,
  QualificationToFirefighterEntity,
  QualificationEntity,
} from "@alarm-monitor/backend/src/database/schema";

type IncidentDetails = {
  incident: IncidentEntity;
  stations: StationDetails[];
  firetrucks: FiretruckDetails[];
};

interface StationDetails extends StationEntity {
  firetrucks: FiretruckEntity[];
}

interface FiretruckDetails extends FiretruckEntity {
  crew: CrewDetails;
}

interface CrewDetails extends CrewEntity {
  firefighters: FirefighterDetails[];
}

interface FirefighterDetails extends FirefighterEntity {
  qualificationToFirefighter: QualificationToFirefighterDetails[];
}

interface QualificationToFirefighterDetails
  extends QualificationToFirefighterEntity {
  qualification: QualificationEntity;
}

export * from "@alarm-monitor/backend/src/database/schema";
export type {
  IncidentDetails,
  StationDetails,
  FiretruckDetails,
  FirefighterDetails,
};
