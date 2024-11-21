import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { Device } from '../../domain/Device';
import { DeviceFilters } from '../../domain/DeviceInterfaces';
import { DeviceRepository } from '../../domain/DeviceRepository';
import { DeviceName } from '../../domain/DeviceName';
import { DeviceDescription } from '../../domain/DeviceDescription';
import { DeviceTag } from '../../domain/DeviceTag';
import { DevicePlace } from '../../domain/DevicePlace';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { DeviceCondition } from '../../domain/DeviceCondition';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { DeviceId } from '../../domain/DeviceId';

export class DeviceFind {
  constructor(private readonly repository: DeviceRepository) {}

  async run(
    id?: string,
    idPlant?: string,
    name?: string,
    description?: string,
    tag?: string,
    place?: Coordinates,
    condition?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
  ): Promise<Device[]> {
    const filters: DeviceFilters = {
      ...(id && { id: new DeviceId(id) }),
      ...(idPlant && { idPlant: new PlantId(idPlant) }),
      ...(name && { name: new DeviceName(name) }),
      ...(description && { description: new DeviceDescription(description) }),
      ...(tag && { tag: new DeviceTag(tag) }),
      ...(place && { place: new DevicePlace(place) }),
      ...(condition && { condition: new DeviceCondition(condition) }),
      ...(createdAt && { createdAt: new BaseDate(createdAt) }),
      ...(updatedAt && { updatedAt: new BaseDate(createdAt) }),
      ...(deletedAt && { deletedAt: new BaseDate(createdAt) }),
    };

    return this.repository.find(filters);
  }
}
