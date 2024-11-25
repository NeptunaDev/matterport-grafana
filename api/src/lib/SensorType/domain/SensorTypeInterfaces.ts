import {
  BaseCreate,
  BaseEdit,
  BaseFilters,
} from 'src/lib/Shared/domain/RepositoryDtos';
import { SensorTypeId } from './SensorTypeId';
import { SensorType } from './SensorType';

export interface SensorTypeFilters
  extends BaseFilters<SensorTypeId, SensorType> {}

export interface SensorTypeCreate
  extends BaseCreate<SensorTypeId, SensorType> {}

export interface SensorTypeEdit extends BaseEdit<SensorTypeId, SensorType> {}
