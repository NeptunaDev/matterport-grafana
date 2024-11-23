import { InjectModel } from '@nestjs/mongoose';
import { DeviceRepository } from '../../domain/DeviceRepository';
import { DeviceDocument, MongoDevice } from './MongoDeviceSchema';

import { Device } from '../../domain/Device';
import { DeviceId } from '../../domain/DeviceId';

import { DeviceCreate, DeviceEdit } from '../../domain/DeviceInterfaces';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import { Model } from 'mongoose';
import { MongoDeviceService } from './MongoDeviceService';

export class MongoDeviceRepository implements DeviceRepository {
  constructor(
    @InjectModel(MongoDevice.name) private readonly model: Model<MongoDevice>,
  ) {}

  async save(entity: DeviceEdit | DeviceCreate): Promise<void> {
    if (isBaseCreate(entity)) {
      await this.model.create({
        idPlant: entity.idPlant.value,
        name: entity.name.value,
        description: entity.description.value,
        tag: entity.tag.value,
        place: entity.place.value,
        condition: entity.condition.value,
      });
      return;
    }

    const { id, idPlant, name, description, tag, place, condition } =
      entity as DeviceEdit;

    await this.model.updateOne(
      { _id: id.value },
      {
        ...(idPlant && { idPlant: idPlant.value }),
        ...(name && { name: name.value }),
        ...(description && { description: description.value }),
        ...(tag && { tag: tag.value }),
        ...(place && { place: place.value }),
        ...(condition && { condition: condition.value }),
      },
    );
  }

  async find(
    filters: Partial<Device>,
    populateIdPlant?: boolean,
  ): Promise<Device[]> {
    const {
      id,
      condition,
      createdAt,
      deletedAt,
      description,
      idPlant,
      name,
      place,
      tag,
      updatedAt,
    } = filters;
    const query = this.model.find({
      deletedAt: deletedAt?.value ?? { $eq: null },
      ...(id && { _id: id.value }),
      ...(condition && { condition: condition.value }),
      ...(createdAt && { createdAt: createdAt.value }),
      ...(description && { description: description.value }),
      ...(idPlant && { idPlant: idPlant.value }),
      ...(name && { name: name.value }),
      ...(place && { place: place.value }),
      ...(tag && { tag: tag.value }),
      ...(updatedAt && { updatedAt: updatedAt.value }),
    });

    if (populateIdPlant) {
      query.populate('idPlant');
    }

    const devices = await query.exec();

    return devices.map(MongoDeviceService.toDomain);
  }

  async findById(id: DeviceId): Promise<Device> {
    const device = await this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
    return MongoDeviceService.toDomain(device as DeviceDocument);
  }

  async remove(id: DeviceId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
