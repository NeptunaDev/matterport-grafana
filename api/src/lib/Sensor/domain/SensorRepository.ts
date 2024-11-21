import { Repository } from 'src/lib/Shared/domain/Repository';
import { SensorId } from './SensorId';
import { Sensor } from './Sensor';
import { SensorFilter } from './SensorInterface';

export interface SensorRepository extends Repository<SensorId, Sensor> {
  find(
    filters: SensorFilter,
    populateidType?: boolean,
    populateidDevice?: boolean,
  ): Promise<Sensor[]>;
}
