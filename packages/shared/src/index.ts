import {
  Crews,
  Firefighters,
  Firetrucks,
  Incidents,
  Stations,
  QualificationToFirefighter,
  Qualifications,
} from "@alarm-monitor/backend/src/database/schema";

type IncidentDetails = {
  incident: Incidents;
  stations: StationDetails[];
  firetrucks: FiretruckDetails[];
};

interface StationDetails extends Stations {
  firetrucks: Firetrucks[];
}

interface FiretruckDetails extends Firetrucks {
  crew: CrewDetails;
}

interface CrewDetails extends Crews {
  firefighters: FirefighterDetails[];
}

interface FirefighterDetails extends Firefighters {
  qualificationToFirefighter: QualificationToFirefighterDetails[];
}

interface QualificationToFirefighterDetails extends QualificationToFirefighter {
  qualification: Qualifications;
}

export * from "@alarm-monitor/backend/src/database/schema";
export type {
  IncidentDetails,
  StationDetails,
  FiretruckDetails,
  FirefighterDetails,
};
