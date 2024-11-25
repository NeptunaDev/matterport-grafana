import {
  BaseCreate,
  BaseEdit,
  BaseFilters,
} from 'src/lib/Shared/domain/RepositoryDtos';
import { DeviceId } from './DeviceId';
import { Device } from './Device';

export interface DeviceFilters extends BaseFilters<DeviceId, Device> {}

export interface DeviceCreate extends BaseCreate<DeviceId, Device> {}

export interface DeviceEdit extends BaseEdit<DeviceId, Device> {}
