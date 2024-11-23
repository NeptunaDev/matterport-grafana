import { PlantDocument } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';
import { Device } from '../../domain/Device';
import { DeviceDocument } from './MongoDeviceSchema';
import mongoose from 'mongoose';
import { Plant } from 'src/lib/Plant/domain/Plant';
import { MongoPlantService } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantService';
import { DeviceId } from '../../domain/DeviceId';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { DeviceName } from '../../domain/DeviceName';
import { DeviceDescription } from '../../domain/DeviceDescription';
import { DeviceTag } from '../../domain/DeviceTag';
import { DevicePlace } from '../../domain/DevicePlace';
import { DeviceCondition } from '../../domain/DeviceCondition';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';

export class MongoDeviceService {
  static toDomain(device: DeviceDocument): Device {
    if (!device) return null;

    const plantPopulate = device.idPlant as
      | PlantDocument
      | mongoose.Types.ObjectId;
    let plantId: string;
    let plant: Plant;
    if (!plantPopulate) return null;

    if (plantPopulate instanceof mongoose.Types.ObjectId) {
      plantId = plantPopulate.toString();
    } else {
      plantId = (plantPopulate as PlantDocument)._id.toString();
      plant = MongoPlantService.toDomain(plantPopulate as PlantDocument);
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
}
