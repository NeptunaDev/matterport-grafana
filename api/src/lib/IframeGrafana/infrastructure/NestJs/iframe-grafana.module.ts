import { Module } from '@nestjs/common';
import { IframeGrafanaController } from './iframe-grafana.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  IframeGrafanaSchema,
  MongoIframeGrafana,
} from '../Mongo/MongoIframeGrafanaSchema';
import {
  MongoPlant,
  PlantSchema,
} from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';
import { MongoIframeGrafanaRepository } from '../Mongo/MongoIframeGrafanaRepository';
import { MongoPlantRepository } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantRepository';
import { IframeGrafanaFind } from '../../application/IframeGrafanaFind/IframeGrafanaFind';
import { IframeGrafanaRepository } from '../../domain/IframeGrafanaRepository';
import { IframeGrafanaSave } from '../../application/IframeGrafanaSave/IframeGrafanaSave';
import { PlantRepository } from 'src/lib/Plant/domain/PlantRepository';
import { IframeGrafanaRemove } from '../../application/IframeGrafanaRemove/IframeGrafanaRemove';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoIframeGrafana.name, schema: IframeGrafanaSchema },
      { name: MongoPlant.name, schema: PlantSchema },
    ]),
  ],
  controllers: [IframeGrafanaController],
  providers: [
    {
      provide: 'IframeGrafanaRepository',
      useClass: MongoIframeGrafanaRepository,
    },
    {
      provide: 'PlantRepository',
      useClass: MongoPlantRepository,
    },
    {
      provide: 'IframeGrafanaFind',
      useFactory: (respository: IframeGrafanaRepository) =>
        new IframeGrafanaFind(respository),
      inject: ['IframeGrafanaRepository'],
    },
    {
      provide: 'IframeGrafanaSave',
      useFactory: (
        respository: IframeGrafanaRepository,
        plantRepository: PlantRepository,
      ) => new IframeGrafanaSave(respository, plantRepository),
      inject: ['IframeGrafanaRepository', 'PlantRepository'],
    },
    {
      provide: 'IframeGrafanaRemove',
      useFactory: (respository: IframeGrafanaRepository) =>
        new IframeGrafanaRemove(respository),
      inject: ['IframeGrafanaRepository'],
    },
  ],
})
export class IframeGrafanaModule {}
