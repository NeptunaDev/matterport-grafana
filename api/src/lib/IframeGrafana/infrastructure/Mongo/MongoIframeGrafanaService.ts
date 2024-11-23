import { PlantDocument } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';
import { IframeGrafana } from '../../domain/IframeGrafana';
import { MongoIframeGrafanaDocumet } from './MongoIframeGrafanaSchema';
import mongoose from 'mongoose';
import { Plant } from 'src/lib/Plant/domain/Plant';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { IframeGrafanaId } from '../../domain/IframeGrafanaId';
import { IframeGrafanaOrder } from '../../domain/IframeGrafanaOrder';
import { IframeGrafanaUrl } from '../../domain/IframeGrafanaUrl';
import { MongoPlantService } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantService';

export class MongoIframeGrafanaService {
  static toDomain(iframeGrafana: MongoIframeGrafanaDocumet): IframeGrafana {
    if (!iframeGrafana) return null;
    const plantPopulate = iframeGrafana.idPlant as
      | PlantDocument
      | mongoose.Types.ObjectId;
    let plantId: PlantId;
    let plant: Plant;

    if (plantPopulate instanceof mongoose.Types.ObjectId) {
      plantId = new PlantId(plantPopulate.toString());
    } else {
      plantId = new PlantId(plantPopulate._id.toString());
      plant = MongoPlantService.toDomain(plantPopulate);
    }

    return new IframeGrafana({
      id: new IframeGrafanaId(iframeGrafana._id.toString()),
      createdAt: new BaseDate(iframeGrafana.createdAt),
      idPlant: plantId,
      order: new IframeGrafanaOrder(iframeGrafana.order),
      updatedAt: new BaseDate(iframeGrafana.updatedAt),
      url: new IframeGrafanaUrl(iframeGrafana.url),
      plant,
      deletedAt: iframeGrafana.deletedAt
        ? new BaseDate(iframeGrafana.deletedAt)
        : null,
    });
  }
}
