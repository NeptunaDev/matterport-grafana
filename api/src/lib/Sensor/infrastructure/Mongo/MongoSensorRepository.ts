import { InjectModel } from '@nestjs/mongoose';
import { SensorRepository } from '../../domain/SensorRepository';
import { MongoSensor, SensorDocument } from './MongoSensorSchema';
import { Sensor } from '../../domain/Sensor';
import { Model } from 'mongoose';
import { SensorId } from '../../domain/SensorId';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import {
  SensorCreate,
  SensorEdit,
  SensorFilter,
} from '../../domain/SensorInterface';
import { MongoSensorService } from './MongoSensorService';

export class MongoSensorRepository implements SensorRepository {
  constructor(
    @InjectModel(MongoSensor.name) private readonly model: Model<MongoSensor>,
  ) {}

  async save(entity: SensorCreate | SensorEdit): Promise<void> {
    if (isBaseCreate(entity)) {
      await this.model.create({
        idType: entity.idType.value,
        idDevice: entity.idDevice.value,
        place: entity.place.value,
        vector: entity.vector.value,
        title: entity.title.value,
        description: entity.description.value,
        color: entity.color.value,
      });
      return;
    }
    const { id, idType, idDevice, place, vector, title, description, color } =
      entity as SensorEdit;

    await this.model.updateOne(
      { _id: id.value },
      {
        ...(idType && { idType: idType.value }),
        ...(idDevice && { idDevice: idDevice.value }),
        ...(place && { place: place.value }),
        ...(vector && { vector: vector.value }),
        ...(title && { title: title.value }),
        ...(description && { description: description.value }),
        ...(color && { color: color.value }),
      },
    );
  }

  async find(
    filters: SensorFilter,
    populateidType?: boolean,
    populateidDevice?: boolean,
  ): Promise<Sensor[]> {
    const query = this.model.find({
      deletedAt: filters.deletedAt?.value ?? { $eq: null },
      ...(filters.id && { _id: filters.id.value }),
      ...(filters.idType && { idType: filters.idType.value }),
      ...(filters.idDevice && { idDevice: filters.idDevice.value }),
      ...(filters.place && { place: filters.place.value }),
      ...(filters.vector && { vector: filters.vector.value }),
      ...(filters.title && { title: filters.title.value }),
      ...(filters.description && { description: filters.description.value }),
      ...(filters.color && { color: filters.color.value }),
      ...(filters.createdAt && { createdAt: filters.createdAt.value }),
      ...(filters.updatedAt && { updatedAt: filters.updatedAt.value }),
    });

    if (populateidType) query.populate('idType');
    if (populateidDevice) query.populate('idDevice');

    const sensors = await query.exec();

    return sensors.map(MongoSensorService.toDomain);
  }

  async findById(id: SensorId): Promise<Sensor> {
    const sensor = await this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
    return MongoSensorService.toDomain(sensor as SensorDocument);
  }

  async remove(id: SensorId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
