import { InjectModel } from '@nestjs/mongoose';
import { SensorRepository } from '../../domain/SensorRepository';
import { MongoSensor, SensorDocument } from './MongoSensorSchema';
import { Sensor } from '../../domain/Sensor';
import { SensorTypeDocuemnt } from 'src/lib/SensorType/infrastructure/Mongo/MongoSensorTypeSchema';
import mongoose, { Model } from 'mongoose';
import { SensorType } from 'src/lib/SensorType/domain/SensorType';
import { SensorTypeId } from 'src/lib/SensorType/domain/SensorTypeId';
import { SensorTypeType } from 'src/lib/SensorType/domain/SensorTypeType';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { DeviceDocument } from 'src/lib/Device/infrastructure/Mongo/MongoDeviceSchema';
import { Device } from 'src/lib/Device/domain/Device';
import { DeviceId } from 'src/lib/Device/domain/DeviceId';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { DeviceName } from 'src/lib/Device/domain/DeviceName';
import { DeviceDescription } from 'src/lib/Device/domain/DeviceDescription';
import { DeviceTag } from 'src/lib/Device/domain/DeviceTag';
import { DevicePlace } from 'src/lib/Device/domain/DevicePlace';
import { DeviceCondition } from 'src/lib/Device/domain/DeviceCondition';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { SensorId } from '../../domain/SensorId';
import { SensorPlace } from '../../domain/SensorPlace';
import { SensorVector } from '../../domain/SensorVector';
import { SensorTitle } from '../../domain/SensorTitle';
import { SensorDescription } from '../../domain/SensorDescription';
import { SensorColor } from '../../domain/SensorColor';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import {
  SensorCreate,
  SensorEdit,
  SensorFilter,
} from '../../domain/SensorInterface';

export class MongoSensorRepository implements SensorRepository {
  constructor(
    @InjectModel(MongoSensor.name) private readonly model: Model<MongoSensor>,
  ) {}

  private toDomain(sensor: SensorDocument): Sensor {
    const devicePopulated = sensor.idDevice as
      | DeviceDocument
      | mongoose.Types.ObjectId;
    let deviceId: string;
    let device: Device;

    if (devicePopulated instanceof mongoose.Types.ObjectId) {
      deviceId = devicePopulated.toString();
    } else {
      deviceId = devicePopulated._id.toString();
      device = new Device(
        new DeviceId(deviceId),
        new PlantId(devicePopulated.idPlant.toString()),
        new DeviceName(devicePopulated.name),
        new DeviceDescription(devicePopulated.description),
        new DeviceTag(devicePopulated.tag),
        new DevicePlace(devicePopulated.place as Coordinates),
        new DeviceCondition(devicePopulated.condition),
        new BaseDate(devicePopulated.createdAt),
        new BaseDate(devicePopulated.updatedAt),
        devicePopulated.deletedAt
          ? new BaseDate(devicePopulated.deletedAt)
          : null,
      );
    }

    const sensorTypePopulated = sensor.idType as
      | SensorTypeDocuemnt
      | mongoose.Types.ObjectId;
    let sensorTypeId: string;
    let sensorType: SensorType;

    if (sensorTypePopulated instanceof mongoose.Types.ObjectId) {
      sensorTypeId = sensorTypePopulated.toString();
    } else {
      sensorTypeId = sensorTypePopulated._id.toString();
      sensorType = new SensorType(
        new SensorTypeId(sensorTypeId),
        new SensorTypeType(sensorTypePopulated.type),
        new BaseDate(sensorTypePopulated.createdAt),
        new BaseDate(sensorTypePopulated.updatedAt),
        sensorTypePopulated.deletedAt
          ? new BaseDate(sensorTypePopulated.deletedAt)
          : null,
      );
    }

    return new Sensor(
      new SensorId(sensor._id.toString()),
      new SensorTypeId(sensorTypeId),
      new DeviceId(deviceId),
      new SensorPlace(sensor.place as Coordinates),
      new SensorVector(sensor.vector as Coordinates),
      new SensorTitle(sensor.title),
      new SensorDescription(sensor.description),
      new SensorColor(sensor.color),
      new BaseDate(sensor.createdAt),
      new BaseDate(sensor.updatedAt),
      sensor.deletedAt ? new BaseDate(sensor.deletedAt) : null,
      sensorType,
      device,
    );
  }

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

    return sensors.map(this.toDomain);
  }

  async findById(id: SensorId): Promise<Sensor> {
    return this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
  }

  async remove(id: SensorId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
