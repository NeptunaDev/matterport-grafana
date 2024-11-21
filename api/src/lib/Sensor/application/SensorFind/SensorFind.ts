import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { SensorRepository } from '../../domain/SensorRepository';
import { Sensor } from '../../domain/Sensor';
import { SensorFilter } from '../../domain/SensorInterface';
import { SensorId } from '../../domain/SensorId';
import { SensorTypeId } from 'src/lib/SensorType/domain/SensorTypeId';
import { DeviceId } from 'src/lib/Device/domain/DeviceId';
import { SensorPlace } from '../../domain/SensorPlace';
import { SensorVector } from '../../domain/SensorVector';
import { SensorTitle } from '../../domain/SensorTitle';
import { SensorDescription } from '../../domain/SensorDescription';
import { SensorColor } from '../../domain/SensorColor';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

export class SensorFind {
  constructor(private readonly repository: SensorRepository) {}

  async run(
    id?: string,
    idType?: string,
    idDevice?: string,
    place?: Coordinates,
    vector?: Coordinates,
    title?: string,
    description?: string,
    color?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
    populateidType?: boolean,
    populateidDevice?: boolean,
  ): Promise<Sensor[]> {
    const filters: SensorFilter = {
      ...(id && { id: new SensorId(id) }),
      ...(idType && { idType: new SensorTypeId(idType) }),
      ...(idDevice && { idDevice: new DeviceId(idDevice) }),
      ...(place && { place: new SensorPlace(place) }),
      ...(vector && { vector: new SensorVector(vector) }),
      ...(title && { title: new SensorTitle(title) }),
      ...(description && { description: new SensorDescription(description) }),
      ...(color && { color: new SensorColor(color) }),
      ...(createdAt && { createdAt: new BaseDate(createdAt) }),
      ...(updatedAt && { updatedAt: new BaseDate(updatedAt) }),
      ...(deletedAt && { deletedAt: new BaseDate(deletedAt) }),
    };

    return this.repository.find(filters, populateidType, populateidDevice);
  }
}
