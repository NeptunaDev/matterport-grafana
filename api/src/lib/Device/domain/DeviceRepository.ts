import { Repository } from 'src/lib/Shared/domain/Repository';
import { DeviceId } from './DeviceId';
import { Device } from './Device';
import { DeviceFilters } from './DeviceInterfaces';

export interface DeviceRepository extends Repository<DeviceId, Device> {
  find(filters: DeviceFilters, populateIdPlant?: boolean): Promise<Device[]>;
}
