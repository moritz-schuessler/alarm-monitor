import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { MQTTService } from './mqtt.service';

interface Payload {
  crew: string[];
}

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MQTTService) {}

  @MessagePattern('firetrucks/+/crew')
  async handleCrewChange(
    @Payload() data: Payload,
    @Ctx() context: MqttContext,
  ) {
    const topic = context.getTopic();
    const radioIdentification = topic.split('/')[1];

    await this.mqttService.updateCrewForFiretruck(
      radioIdentification,
      data.crew,
    );
  }
}
