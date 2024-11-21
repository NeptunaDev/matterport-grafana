import { Repository } from 'src/lib/Shared/domain/Repository';
import { SensorTypeId } from './SensorTypeId';
import { SensorType } from './SensorType';

export interface SensorTypeRepository
  extends Repository<SensorTypeId, SensorType> {}
