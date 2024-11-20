import { BaseClass } from 'src/lib/Shared/domain/BaseClass';
import { SensorTypeType } from './SensorTypeType';
import { SensorTypeId } from './SensorTypeId';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

export class SensorType extends BaseClass<SensorTypeId> {
  type: SensorTypeType;

  constructor(
    id: SensorTypeId,
    type: SensorTypeType,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.type = type;
  }
}
