import { InjectModel } from '@nestjs/mongoose';
import { DeviceRepository } from '../../domain/DeviceRepository';
import { DeviceDocument, MongoDevice } from './MongoDeviceSchema';
import mongoose, { Model } from 'mongoose';
import { Device } from '../../domain/Device';
import { DeviceId } from '../../domain/DeviceId';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { DeviceName } from '../../domain/DeviceName';
import { DeviceDescription } from '../../domain/DeviceDescription';
import { DeviceTag } from '../../domain/DeviceTag';
import { DevicePlace } from '../../domain/DevicePlace';
import { DeviceCondition } from '../../domain/DeviceCondition';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { PlantDocument } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';
import { DeviceCreate, DeviceEdit } from '../../domain/DeviceInterfaces';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { Plant } from 'src/lib/Plant/domain/Plant';
import { PlantMatterportSid } from 'src/lib/Plant/domain/PlantMatterportSid';
import { PlantName } from 'src/lib/Plant/domain/PlantName';

export class MongoDeviceRepository implements DeviceRepository {
  constructor(
    @InjectModel(MongoDevice.name) private readonly model: Model<MongoDevice>,
  ) {}

  private toDomain(device: DeviceDocument): Device {
    const plantPopulate = device.idPlant as
      | PlantDocument
      | mongoose.Types.ObjectId;
    let plantId: string;
    let plant: Plant;

    if (plantPopulate instanceof mongoose.Types.ObjectId) {
      plantId = plantPopulate.toString();
    } else {
      plantId = (plantPopulate as PlantDocument)._id.toString();
      plant = new Plant(
        new PlantId(plantPopulate._id.toString()),
        new PlantMatterportSid(plantPopulate.matterportSid),
        new PlantName(plantPopulate.name),
        new BaseDate(plantPopulate.createdAt),
        new BaseDate(plantPopulate.updatedAt),
        plantPopulate.deletedAt ? new BaseDate(plantPopulate.deletedAt) : null,
      );
    }

    return new Device(
      new DeviceId(device._id.toString()),
      new PlantId(plantId),
      new DeviceName(device.name),
      new DeviceDescription(device.description),
      new DeviceTag(device.tag),
      new DevicePlace(device.place as Coordinates),
      new DeviceCondition(device.condition),
      new BaseDate(device.createdAt),
      new BaseDate(device.updatedAt),
      device.deletedAt ? new BaseDate(device.deletedAt) : null,
      plant,
    );
  }

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

  async find(filters: Partial<Device>): Promise<any> {
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

    const devices = await this.model
      .find({
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
      })
      .populate('idPlant');
    return devices.map(this.toDomain);
  }

  async findById(id: DeviceId): Promise<Device> {
    return this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
  }

  async remove(id: DeviceId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
