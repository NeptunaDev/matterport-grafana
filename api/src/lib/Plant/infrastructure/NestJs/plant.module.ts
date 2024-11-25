import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoPlant, PlantSchema } from '../Mongo/MongoPlantSchema';
import { MongoPlantRepository } from '../Mongo/MongoPlantRepository';
import { PlantFind } from '../../application/PlantFind/PlantFind';
import { PlantRemove } from '../../application/PlantRemove/PlantRemove';
import { PlantSave } from '../../application/PlantSave/PlantSave';
import { PlantRepository } from '../../domain/PlantRepository';

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
      useFactory: (respository: PlantRepository) => new PlantFind(respository),
      inject: ['PlantRepository'],
    },
    {
      provide: 'PlantRemove',
      useFactory: (respository: PlantRepository) =>
        new PlantRemove(respository),
      inject: ['PlantRepository'],
    },
    {
      provide: 'PlantSave',
      useFactory: (respository: PlantRepository) => new PlantSave(respository),
      inject: ['PlantRepository'],
    },
  ],
})
export class PlantModule {}
