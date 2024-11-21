import { Repository } from 'src/lib/Shared/domain/Repository';
import { DeviceId } from './DeviceId';
import { Device } from './Device';

export interface DeviceRepository extends Repository<DeviceId, Device> {}
