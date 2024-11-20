import { InjectModel } from '@nestjs/mongoose';
import { PlantRepository } from '../../domain/PlantRepository';
import { MongoPlant } from './MongoPlantSchema';
import { Model } from 'mongoose';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import { Plant } from '../../domain/Plant';
import { PlantId } from '../../domain/PlantId';
import {
  PlantCreate,
  PlantEdit,
  PlantFilters,
} from '../../domain/PlantInterfaces';

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
      { _id: id },
      {
        ...(matterportSid && { matterportSid }),
        ...(name && { name }),
      },
    );
  }

  async find(filters: PlantFilters): Promise<Plant[]> {
    const { id, matterportSid, name, createdAt, updatedAt, deletedAt } =
      filters;
    return this.plantModel.find({
      deletedAt: deletedAt.value ?? { $exists: false },
      ...(id && { _id: id.value }),
      ...(matterportSid && { matterportSid: matterportSid.value }),
      ...(name && { name: name.value }),
      ...(createdAt && { createdAt: createdAt.value }),
      ...(updatedAt && { updatedAt: updatedAt.value }),
    });
  }

  async findById(id: PlantId): Promise<Plant> {
    return this.plantModel.findById(id, { deletedAt: { $exists: false } });
  }

  async remove(id: PlantId): Promise<void> {
    await this.plantModel.updateOne(
      {
        _id: id,
      },
      {
        deletedAt: new Date(),
      },
    );
  }
}
