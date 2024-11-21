import { InjectModel } from '@nestjs/mongoose';
import { SensorTypeRepository } from '../../domain/SensorTypeRepository';
import { MongoSensorType, SensorTypeDocuemnt } from './MongoSensorTypeSchema';
import { Model } from 'mongoose';
import { SensorType } from '../../domain/SensorType';
import { SensorTypeId } from '../../domain/SensorTypeId';
import { SensorTypeType } from '../../domain/SensorTypeType';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import {
  SensorTypeCreate,
  SensorTypeEdit,
  SensorTypeFilters,
} from '../../domain/SensorTypeInterfaces';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';

export class MongoSensorTypeRepository implements SensorTypeRepository {
  constructor(
    @InjectModel(MongoSensorType.name)
    private readonly model: Model<MongoSensorType>,
  ) {}

  private toDomain(sensorType: SensorTypeDocuemnt): SensorType {
    return new SensorType(
      new SensorTypeId(sensorType._id.toString()),
      new SensorTypeType(sensorType.type),
      new BaseDate(sensorType.createdAt),
      new BaseDate(sensorType.updatedAt),
      sensorType.deletedAt ? new BaseDate(sensorType.deletedAt) : null,
    );
  }

  async save(entity: SensorTypeEdit | SensorTypeCreate): Promise<void> {
    if (isBaseCreate(entity)) {
      await this.model.create({
        type: entity.type.value,
      });
      return;
    }
    const { id, type } = entity as SensorTypeEdit;
    await this.model.updateOne(
      { _id: id.value },
      { ...(type && { type: type.value }) },
    );
  }

  async find(filters: SensorTypeFilters): Promise<SensorType[]> {
    const sensorTypes = await this.model.find({
      deletedAt: filters.deletedAt?.value ?? { $eq: null },
      ...(filters.id && { _id: filters.id.value }),
      ...(filters.type && { type: filters.type.value }),
      ...(filters.createdAt && { createdAt: filters.createdAt.value }),
      ...(filters.updatedAt && { updatedAt: filters.updatedAt.value }),
    });

    return sensorTypes.map(this.toDomain);
  }

  async findById(id: SensorTypeId): Promise<SensorType> {
    return this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
  }

  async remove(id: SensorTypeId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
