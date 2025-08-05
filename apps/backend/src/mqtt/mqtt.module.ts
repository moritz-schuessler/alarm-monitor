import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MQTTService } from './mqtt.service';
import { FiretrucksModule } from 'src/firetrucks/firetrucks.module';
import { FirefightersModule } from 'src/firefighters/firefighters.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
            url: configService.getOrThrow<string>('MQTT_URL'),
          },
        }),
      },
    ]),
    FiretrucksModule,
    FirefightersModule,
  ],
  controllers: [MqttController],
  providers: [MQTTService],
})
export class MqttModule {}
