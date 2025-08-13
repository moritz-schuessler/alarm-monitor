import { drizzle } from 'drizzle-orm/libsql';

import * as schema from 'src/data/shared/schema';
import { qualifications } from 'src/data/shared/schema';

const seedQualifications = async () => {
  const db = drizzle(process.env.DATABASE_URL!, { schema: schema });

  await db.insert(qualifications).values([
    { type: 'Lehrgang', name: 'Grundlehrgang' },
    { type: 'Lehrgang', name: 'Truppführer' },
    { type: 'Lehrgang', name: 'Gruppenführer' },
    { type: 'Lehrgang', name: 'Zugführer' },
    { type: 'Lehrgang', name: 'Verbandsführer' },
    { type: 'Lehrgang', name: 'Atemschutzgeräteträger' },
    { type: 'Lehrgang', name: 'Maschinist' },
    { type: 'Lehrgang', name: 'Sanitäter' },
    { type: 'Lehrgang', name: 'Absturzsicherung' },
    { type: 'Lehrgang', name: 'DLK-Maschinist' },
    { type: 'Lehrgang', name: 'H-Verkehrsunfall' },
  ]);

  await db.insert(qualifications).values([
    { type: 'Führungsposition', name: 'Wehrführer' },
    { type: 'Führungsposition', name: 'Stellvertretender Wehrführer' },
    { type: 'Führungsposition', name: 'Stadtbrandinsprektor' },
    {
      type: 'Führungsposition',
      name: 'Stellvertretender Stadtbrandinsprektor',
    },
    { type: 'Führungsposition', name: 'Gemeindebrandinsprektor' },
    {
      type: 'Führungsposition',
      name: 'Stellvertretender Gemeindebrandinsprektor',
    },
  ]);

  await db.insert(qualifications).values([
    { type: 'Beruf', name: 'Elektriker' },
    { type: 'Beruf', name: 'Automechaniker' },
    { type: 'Beruf', name: 'Industriemechaniker' },
    { type: 'Beruf', name: 'Straßenbauer' },
    { type: 'Beruf', name: 'ITler' },
    { type: 'Beruf', name: 'Schreiner' },
    { type: 'Beruf', name: 'Dachdecker' },
    { type: 'Beruf', name: 'Zimmermann' },
    { type: 'Beruf', name: 'Maurer' },
    { type: 'Beruf', name: 'Klemptner' },
    { type: 'Beruf', name: 'Heizungsbauer' },
  ]);

  await db.insert(qualifications).values([
    { type: 'Fachgebiet', name: 'Elektriker' },
    { type: 'Fachgebiet', name: 'Atemschutz' },
    { type: 'Fachgebiet', name: 'Technik' },
    { type: 'Fachgebiet', name: 'Social Mediav' },
    { type: 'Fachgebiet', name: 'TEL' },
  ]);

  await db
    .insert(qualifications)
    .values([{ type: 'Medizinische Untersuchung', name: 'G26.3' }]);

  await db.insert(qualifications).values([
    { type: 'Führerschein', name: 'B' },
    { type: 'Führerschein', name: 'C' },
    { type: 'Führerschein', name: 'CE' },
    { type: 'Führerschein', name: 'Feuerwehrführerschein' },
  ]);

  await db.insert(qualifications).values([
    { type: 'Voraussetzung', name: 'Atemschutz/Unterweisung' },
    { type: 'Voraussetzung', name: 'Atemschutz/Atemschutzstrecke' },
    { type: 'Voraussetzung', name: 'Atemschutz/Einsatz/Übung' },
  ]);
};

export default seedQualifications;
