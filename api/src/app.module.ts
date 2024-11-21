import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantModule } from './lib/Plant/infrastructure/NestJs/plant.module';
import { DeviceModule } from './lib/Device/infrastructure/NestJs/device.module';
import { SensorTypeModule } from './lib/SensorType/infrastructure/NestJs/sensor-type.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/iot',
    ),
    PlantModule,
    DeviceModule,
    SensorTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
