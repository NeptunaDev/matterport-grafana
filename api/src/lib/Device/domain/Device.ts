import { BaseClass } from 'src/lib/Shared/domain/BaseClass';
import { DeviceId } from './DeviceId';
import { DeviceName } from './DeviceName';
import { DeviceDescription } from './DeviceDescription';
import { DeviceTag } from './DeviceTag';
import { DevicePlace } from './DevicePlace';
import { DeviceCondition } from './DeviceCondition';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { Plant } from 'src/lib/Plant/domain/Plant';

export class Device extends BaseClass<DeviceId> {
  idPlant: PlantId;
  name: DeviceName;
  description: DeviceDescription;
  tag: DeviceTag;
  place: DevicePlace;
  condition: DeviceCondition;
  plant?: Plant;

  constructor(
    id: DeviceId,
    idPlant: PlantId,
    name: DeviceName,
    description: DeviceDescription,
    tag: DeviceTag,
    place: DevicePlace,
    condition: DeviceCondition,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
    plant?: Plant,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.idPlant = idPlant;
    this.name = name;
    this.description = description;
    this.tag = tag;
    this.place = place;
    this.condition = condition;
    if (plant) {
      this.plant = plant;
    }
  }
}
