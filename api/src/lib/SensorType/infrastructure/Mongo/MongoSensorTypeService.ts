import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { SensorType } from '../../domain/SensorType';
import { SensorTypeId } from '../../domain/SensorTypeId';
import { SensorTypeType } from '../../domain/SensorTypeType';
import { SensorTypeDocuemnt } from './MongoSensorTypeSchema';

export class MongoSensorTypeService {
  static toDomain(sensorType: SensorTypeDocuemnt): SensorType {
    if (!sensorType) return null;
    return new SensorType(
      new SensorTypeId(sensorType._id.toString()),
      new SensorTypeType(sensorType.type),
      new BaseDate(sensorType.createdAt),
      new BaseDate(sensorType.updatedAt),
      sensorType.deletedAt ? new BaseDate(sensorType.deletedAt) : null,
    );
  }
}
