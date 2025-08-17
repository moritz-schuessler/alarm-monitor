import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MQTTService } from './mqtt.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { FiretrucksModule } from 'src/data/domains/firetrucks/firetrucks.module';
import { FirefightersModule } from 'src/data/domains/firefighters/firefighters.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.getOrThrow<string>('MQTT_BROKER'),
          },
        }),
      },
    ]),
    FirefightersModule,
    FiretrucksModule,
  ],
  controllers: [MqttController],
  providers: [MQTTService],
})
export class MqttModule {}
