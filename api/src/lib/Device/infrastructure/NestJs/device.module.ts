import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema, MongoDevice } from '../Mongo/MongoDeviceSchema';
import { MongoDeviceRepository } from '../Mongo/MongoDeviceRepository';
import { DeviceFind } from '../../application/DeviceFind/DeviceFind';
import { DeviceSave } from '../../application/DeviceSave/DeviceSave';
import { MongoPlantRepository } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantRepository';
import { DeviceRemove } from '../../application/DeviceRemove/DeviceRemove';
import {
  MongoPlant,
  PlantSchema,
} from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoDevice.name, schema: DeviceSchema },
      { name: MongoPlant.name, schema: PlantSchema },
    ]),
  ],
  controllers: [DeviceController],
  providers: [
    {
      provide: 'DeviceRepository',
      useClass: MongoDeviceRepository,
    },
    {
      provide: 'PlantRepository',
      useClass: MongoPlantRepository,
    },
    {
      provide: 'DeviceFind',
      useFactory: (repository: MongoDeviceRepository) =>
        new DeviceFind(repository),
      inject: ['DeviceRepository'],
    },
    {
      provide: 'DeviceSave',
      useFactory: (
        repository: MongoDeviceRepository,
        deviceRepository: MongoPlantRepository,
      ) => new DeviceSave(repository, deviceRepository),
      inject: ['DeviceRepository', 'PlantRepository'],
    },
    {
      provide: 'DeviceRemove',
      useFactory: (repository: MongoDeviceRepository) =>
        new DeviceRemove(repository),
      inject: ['DeviceRepository'],
    },
  ],
})
export class DeviceModule {}
