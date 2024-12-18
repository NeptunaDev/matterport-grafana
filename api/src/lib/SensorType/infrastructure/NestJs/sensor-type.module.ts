import { Module } from '@nestjs/common';
import { SensorTypeController } from './sensor-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongoSensorType,
  SensorTypeSchema,
} from '../Mongo/MongoSensorTypeSchema';
import { MongoSensorTypeRepository } from '../Mongo/MongoSensorTypeRepository';
import { SensorTypeFind } from '../../application/SensorTypeFind/SensorTypeFind';
import { SensorTypeSave } from '../../application/SensorTypeSave/SensorTypeSave';
import { SensorTypeRemove } from '../../application/SensorTypeRemove/SensorTypeRemove';
import { SensorTypeRepository } from '../../domain/SensorTypeRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoSensorType.name, schema: SensorTypeSchema },
    ]),
  ],
  controllers: [SensorTypeController],
  providers: [
    { provide: 'SensorTypeRepository', useClass: MongoSensorTypeRepository },
    {
      provide: 'SensorTypeFind',
      useFactory: (repository: SensorTypeRepository) =>
        new SensorTypeFind(repository),
      inject: ['SensorTypeRepository'],
    },
    {
      provide: 'SensorTypeSave',
      useFactory: (repository: SensorTypeRepository) =>
        new SensorTypeSave(repository),
      inject: ['SensorTypeRepository'],
    },
    {
      provide: 'SensorTypeRemove',
      useFactory: (repository: SensorTypeRepository) =>
        new SensorTypeRemove(repository),
      inject: ['SensorTypeRepository'],
    },
  ],
})
export class SensorTypeModule {}
