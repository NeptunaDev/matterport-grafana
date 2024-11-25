import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { Plant } from '../../domain/Plant';
import { PlantId } from '../../domain/PlantId';
import { PlantMatterportSid } from '../../domain/PlantMatterportSid';
import { PlantName } from '../../domain/PlantName';
import { PlantDocument } from './MongoPlantSchema';

export class MongoPlantService {
  static toDomain(plant: PlantDocument): Plant {
    if (!plant) null;
    return new Plant(
      new PlantId(plant.id),
      new PlantMatterportSid(plant.matterportSid),
      new PlantName(plant.name),
      new BaseDate(plant.createdAt),
      new BaseDate(plant.updatedAt),
      new BaseDate(plant?.deletedAt ?? null),
    );
  }
}
