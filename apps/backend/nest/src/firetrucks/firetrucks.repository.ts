import { Injectable } from '@nestjs/common';
import { Database, InjectDb } from 'src/database/drizzle.provider';

@Injectable()
export class FiretrucksRepository {
  constructor(@InjectDb() private readonly database: Database) {}

  async findByRadioIdentification(radioIdentification: string) {
    return await this.database.query.firetrucks.findFirst({
      where: (firetrucks, { eq }) =>
        eq(firetrucks.radioIdentification, radioIdentification),
      with: {
        station: true,
      },
    });
  }
}
