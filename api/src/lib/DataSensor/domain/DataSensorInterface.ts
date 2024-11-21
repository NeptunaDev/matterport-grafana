import {
  BaseCreate,
  BaseEdit,
  BaseFilters,
} from 'src/lib/Shared/domain/RepositoryDtos';
import { DataSensorId } from './DataSensorId';
import { DataSensor } from './DataSensor';

export interface DataSensorFilters
  extends BaseFilters<DataSensorId, DataSensor> {}
export interface DataSensorCreate
  extends BaseCreate<DataSensorId, DataSensor> {}
export interface DataSensorEdit extends BaseEdit<DataSensorId, DataSensor> {}
