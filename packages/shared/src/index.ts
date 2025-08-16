import {
  CrewEntity,
  FirefighterEntity,
  FiretruckEntity,
  IncidentEntity,
  StationEntity,
  QualificationToFirefighterEntity,
  QualificationEntity,
  IncidentToStationEntity,
} from "@alarm-monitor/backend/src/data/shared/schema";

interface IncidentDetails {
  incident: IncidentEntity;
  stations: StationDetails[];
  firetrucks: FiretruckDetails[];
}

interface IncidentWithStation extends IncidentEntity {
  incidentsToStations: IncidentToStationEntityWithStation[];
}

interface IncidentToStationEntityWithStation extends IncidentToStationEntity {
  station: StationEntity;
}

interface StationDetails extends StationEntity {
  firetrucks: FiretruckEntity[];
}

interface StationWithFirefighters extends StationDetails {
  firefighters: FirefighterEntity[];
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

export * from "@alarm-monitor/backend/src/data/shared/schema";
export type {
  IncidentDetails,
  IncidentWithStation,
  StationDetails,
  FiretruckDetails,
  FirefighterDetails,
  StationWithFirefighters,
};
