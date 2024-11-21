import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoSensor, SensorSchema } from '../Mongo/MongoSensorSchema';
import {
  MongoSensorType,
  SensorTypeSchema,
} from 'src/lib/SensorType/infrastructure/Mongo/MongoSensorTypeSchema';
import {
  DeviceSchema,
  MongoDevice,
} from 'src/lib/Device/infrastructure/Mongo/MongoDeviceSchema';
import { MongoSensorRepository } from '../Mongo/MongoSensorRepository';
import { MongoSensorTypeRepository } from 'src/lib/SensorType/infrastructure/Mongo/MongoSensorTypeRepository';
import { MongoDeviceRepository } from 'src/lib/Device/infrastructure/Mongo/MongoDeviceRepository';
import { SensorFind } from '../../application/SensorFind/SensorFind';
import { SensorSave } from '../../application/SensorSave/SensorSave';
import { SensorRemove } from '../../application/SensorRemove/SensorRemove';
import { SensorRepository } from '../../domain/SensorRepository';
import { SensorTypeRepository } from 'src/lib/SensorType/domain/SensorTypeRepository';
import { DeviceRepository } from 'src/lib/Device/domain/DeviceRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoSensor.name, schema: SensorSchema },
      { name: MongoSensorType.name, schema: SensorTypeSchema },
      { name: MongoDevice.name, schema: DeviceSchema },
    ]),
  ],
  controllers: [SensorController],
  providers: [
    { provide: 'SensorRepository', useClass: MongoSensorRepository },
    { provide: 'SensorTypeRepository', useClass: MongoSensorTypeRepository },
    { provide: 'MongoDeviceRepository', useClass: MongoDeviceRepository },
    {
      provide: 'SensorFind',
      useFactory: (repository: SensorRepository) => new SensorFind(repository),
      inject: ['SensorRepository'],
    },
    {
      provide: 'SensorSave',
      useFactory: (
        repository: SensorRepository,
        sensorTypeRepository: SensorTypeRepository,
        deviceRepository: DeviceRepository,
      ) => new SensorSave(repository, sensorTypeRepository, deviceRepository),
      inject: [
        'SensorRepository',
        'SensorTypeRepository',
        'MongoDeviceRepository',
      ],
    },
    {
      provide: 'SensorRemove',
      useFactory: (repository: SensorRepository) =>
        new SensorRemove(repository),
      inject: ['SensorRepository'],
    },
  ],
})
export class SensorModule {}
