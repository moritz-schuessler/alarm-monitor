import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MQTTService } from './mqtt.service';
import { FiretrucksModule } from 'src/firetrucks/firetrucks.module';
import { FirefightersModule } from 'src/firefighters/firefighters.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
    FiretrucksModule,
    FirefightersModule,
  ],
  controllers: [MqttController],
  providers: [MQTTService],
})
export class MqttModule {}
