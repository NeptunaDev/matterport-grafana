import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoPlant, PlantSchema } from '../Mongo/MongoPlantSchema';
import { MongoPlantRepository } from '../Mongo/MongoPlantRepository';
import { PlantFind } from '../../application/PlantFind/PlantFind';
import { PlantRemove } from '../../application/PlantRemove/PlantRemove';
import { PlantSave } from '../../application/PlantSave/PlantSave';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MongoPlant.name, schema: PlantSchema }]),
  ],
  controllers: [PlantController],
  providers: [
    {
      provide: 'PlantRepository',
      useClass: MongoPlantRepository,
    },
    {
      provide: 'PlantFind',
      useFactory: (respository: MongoPlantRepository) =>
        new PlantFind(respository),
      inject: ['PlantRepository'],
    },
    {
      provide: 'PlantRemove',
      useFactory: (respository: MongoPlantRepository) =>
        new PlantRemove(respository),
      inject: ['PlantRepository'],
    },
    {
      provide: 'PlantSave',
      useFactory: (respository: MongoPlantRepository) =>
        new PlantSave(respository),
      inject: ['PlantRepository'],
    },
  ],
})
export class PlantModule {}
