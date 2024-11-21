import {
  BaseCreate,
  BaseEdit,
  BaseFilters,
} from 'src/lib/Shared/domain/RepositoryDtos';
import { SensorId } from './SensorId';
import { Sensor } from './Sensor';

export interface SensorFilter extends BaseFilters<SensorId, Sensor> {}
export interface SensorCreate extends BaseCreate<SensorId, Sensor> {}
export interface SensorEdit extends BaseEdit<SensorId, Sensor> {}
