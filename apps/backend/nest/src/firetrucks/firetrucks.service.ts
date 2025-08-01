import { Injectable } from '@nestjs/common';
import { FiretrucksRepository } from './firetrucks.repository';

@Injectable()
export class FiretrucksService {
  constructor(private readonly firetrucksRepository: FiretrucksRepository) {}

  async getFiretruckByRadioIdentification(radioIdentification: string) {
    return await this.firetrucksRepository.findByRadioIdentification(
      radioIdentification,
    );
  }
}
