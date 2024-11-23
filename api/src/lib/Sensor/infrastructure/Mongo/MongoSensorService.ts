import { DeviceDocument } from 'src/lib/Device/infrastructure/Mongo/MongoDeviceSchema';
import { Sensor } from '../../domain/Sensor';
import { SensorDocument } from './MongoSensorSchema';
import mongoose from 'mongoose';
import { Device } from 'src/lib/Device/domain/Device';
import { MongoDeviceService } from 'src/lib/Device/infrastructure/Mongo/MongoDeviceService';
import { SensorTypeDocuemnt } from 'src/lib/SensorType/infrastructure/Mongo/MongoSensorTypeSchema';
import { SensorType } from 'src/lib/SensorType/domain/SensorType';
import { MongoSensorTypeService } from 'src/lib/SensorType/infrastructure/Mongo/MongoSensorTypeService';
import { SensorId } from '../../domain/SensorId';
import { SensorTypeId } from 'src/lib/SensorType/domain/SensorTypeId';
import { DeviceId } from 'src/lib/Device/domain/DeviceId';
import { SensorPlace } from '../../domain/SensorPlace';
import { SensorVector } from '../../domain/SensorVector';
import { SensorTitle } from '../../domain/SensorTitle';
import { SensorDescription } from '../../domain/SensorDescription';
import { SensorColor } from '../../domain/SensorColor';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';

export class MongoSensorService {
  static toDomain(sensor: SensorDocument): Sensor {
    if (!sensor) return null;
    const devicePopulated = sensor.idDevice as
      | DeviceDocument
      | mongoose.Types.ObjectId;
    let deviceId: string;
    let device: Device;
    if (!devicePopulated) return;

    if (devicePopulated instanceof mongoose.Types.ObjectId) {
      deviceId = devicePopulated.toString();
    } else {
      deviceId = devicePopulated._id.toString();
      device = MongoDeviceService.toDomain(devicePopulated);
    }

    const sensorTypePopulated = sensor.idType as
      | SensorTypeDocuemnt
      | mongoose.Types.ObjectId;
    let sensorTypeId: string;
    let sensorType: SensorType;
    if (!sensorTypePopulated) return;

    if (!sensorTypePopulated) return;
    if (sensorTypePopulated instanceof mongoose.Types.ObjectId) {
      sensorTypeId = sensorTypePopulated.toString();
    } else {
      sensorTypeId = sensorTypePopulated._id.toString();
      sensorType = MongoSensorTypeService.toDomain(sensorTypePopulated);
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
}
