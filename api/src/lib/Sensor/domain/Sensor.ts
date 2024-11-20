import { DeviceId } from 'src/lib/Device/domain/DeviceId';
import { SensorTypeId } from 'src/lib/SensorType/domain/SensorTypeId';
import { BaseClass } from 'src/lib/Shared/domain/BaseClass';
import { SensorPlace } from './SensorPlace';
import { SensorVector } from './SensorVector';
import { SensorTitle } from './SensorTitle';
import { SensorDescription } from './SensorDescription';
import { SensorColor } from './SensorColor';
import { SensorId } from './SensorId';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

export class Sensor extends BaseClass<SensorId> {
  idType: SensorTypeId;
  idDevice: DeviceId;
  place: SensorPlace;
  vector: SensorVector;
  title: SensorTitle;
  description: SensorDescription;
  color: SensorColor;

  constructor(
    id: SensorId,
    idType: SensorTypeId,
    idDevice: DeviceId,
    place: SensorPlace,
    vector: SensorVector,
    title: SensorTitle,
    description: SensorDescription,
    color: SensorColor,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.idType = idType;
    this.idDevice = idDevice;
    this.place = place;
    this.vector = vector;
    this.title = title;
    this.description = description;
    this.color = color;
  }
}
