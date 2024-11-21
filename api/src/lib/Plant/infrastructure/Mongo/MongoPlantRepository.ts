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
import { PlantName } from '../../domain/PlantName';
import { PlantMatterportSid } from '../../domain/PlantMatterportSid';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

export class MongoPlantRepository implements PlantRepository {
  constructor(
    @InjectModel(MongoPlant.name)
    private readonly plantModel: Model<MongoPlant>,
  ) {}

  private toDomain(plant: PlantDocument): Plant {
    return new Plant(
      new PlantId(plant.id),
      new PlantMatterportSid(plant.matterportSid),
      new PlantName(plant.name),
      new BaseDate(plant.createdAt),
      new BaseDate(plant.updatedAt),
      new BaseDate(plant?.deletedAt ?? null),
    );
  }

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
      deletedAt: deletedAt?.value ?? { $exists: false },
      ...(id && { _id: id.value }),
      ...(matterportSid && { matterportSid: matterportSid.value }),
      ...(name && { name: name.value }),
      ...(createdAt && { createdAt: createdAt.value }),
      ...(updatedAt && { updatedAt: updatedAt.value }),
    });

    return plants.map(this.toDomain);
  }

  async findById(id: PlantId): Promise<Plant> {
    return this.plantModel.findOne({
      _id: id.value,
      deletedAt: { $exists: false },
    });
  }

  async remove(id: PlantId): Promise<void> {
    await this.plantModel.updateOne(
      { _id: id.value },
      { deletedAt: new Date() },
    );
  }
}
