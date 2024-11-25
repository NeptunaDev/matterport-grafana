import { InjectModel } from '@nestjs/mongoose';
import { PlantRepository } from '../../domain/PlantRepository';
import { MongoPlant, PlantDocument } from './MongoPlantSchema';
import { Model } from 'mongoose';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import { Plant } from '../../domain/Plant';
import { PlantId } from '../../domain/PlantId';
import {
  PlantCreate,
  PlantEdit,
  PlantFilters,
} from '../../domain/PlantInterfaces';
import { MongoPlantService } from './MongoPlantService';

export class MongoPlantRepository implements PlantRepository {
  constructor(
    @InjectModel(MongoPlant.name)
    private readonly plantModel: Model<MongoPlant>,
  ) {}

  async save(entity: PlantEdit | PlantCreate): Promise<void> {
    if (isBaseCreate(entity)) {
      await this.plantModel.create({
        matterportSid: entity.matterportSid.value,
        name: entity.name.value,
      });
      return;
    }

    const { id, matterportSid, name } = entity as PlantEdit;

    await this.plantModel.updateOne(
      { _id: id.value },
      {
        ...(matterportSid && { matterportSid: matterportSid.value }),
        ...(name && { name: name.value }),
      },
    );
  }

  async find(filters: PlantFilters): Promise<Plant[]> {
    const { id, matterportSid, name, createdAt, updatedAt, deletedAt } =
      filters;
    const plants = await this.plantModel.find({
      deletedAt: deletedAt?.value ?? { $eq: null },
      ...(id && { _id: id.value }),
      ...(matterportSid && { matterportSid: matterportSid.value }),
      ...(name && { name: name.value }),
      ...(createdAt && { createdAt: createdAt.value }),
      ...(updatedAt && { updatedAt: updatedAt.value }),
    });

    return plants.map(MongoPlantService.toDomain);
  }

  async findById(id: PlantId): Promise<Plant> {
    const plant = await this.plantModel.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
    return MongoPlantService.toDomain(plant as PlantDocument);
  }

  async remove(id: PlantId): Promise<void> {
    const deletedAt = new Date();
    deletedAt.setSeconds(deletedAt.getSeconds() + 1);
    await this.plantModel.updateOne({ _id: id.value }, { deletedAt });
  }
}
