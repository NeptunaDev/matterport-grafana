import { Module } from '@nestjs/common';
import { DataSensorController } from './data-sensor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DataSensorSchema,
  MongoDataSensor,
} from '../Mongo/MongoDataSensorSchema';
import {
  MongoSensor,
  SensorSchema,
} from 'src/lib/Sensor/infrastructure/Mongo/MongoSensorSchema';
import { MongoDataSensorRepository } from '../Mongo/MongoDataSensorRepository';
import { MongoSensorRepository } from 'src/lib/Sensor/infrastructure/Mongo/MongoSensorRepository';
import { DataSensorFind } from '../../application/DataSensorFind/DataSensorFind';
import { DataSensorRepository } from '../../domain/DataSensorRepository';
import { DataSensorSave } from '../../application/DataSensorSave/DataSensorSave';
import { SensorRepository } from 'src/lib/Sensor/domain/SensorRepository';
import { DataSensorRemove } from '../../application/DataSensorRemove/DataSensorRemove';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoDataSensor.name, schema: DataSensorSchema },
      { name: MongoSensor.name, schema: SensorSchema },
    ]),
  ],
  controllers: [DataSensorController],
  providers: [
    { provide: 'DataSensorRepository', useClass: MongoDataSensorRepository },
    { provide: 'SensorRepository', useClass: MongoSensorRepository },
    {
      provide: 'DataSensorFind',
      useFactory: (repository: DataSensorRepository) =>
        new DataSensorFind(repository),
      inject: ['DataSensorRepository'],
    },
    {
      provide: 'DataSensorSave',
      useFactory: (
        repository: DataSensorRepository,
        SensorRepository: SensorRepository,
      ) => new DataSensorSave(repository, SensorRepository),
      inject: ['DataSensorRepository', 'SensorRepository'],
    },
    {
      provide: 'DataSensorRemove',
      useFactory: (repository: DataSensorRepository) =>
        new DataSensorRemove(repository),
      inject: ['DataSensorRepository'],
    },
  ],
})
export class DataSensorModule {}
