import { Repository } from 'src/lib/Shared/domain/Repository';
import { DataSensorId } from './DataSensorId';
import { DataSensor } from './DataSensor';
import { DataSensorFilters } from './DataSensorInterface';

export interface DataSensorRepository
  extends Repository<DataSensorId, DataSensor> {
  find(
    filter: DataSensorFilters,
    populatedIdSensor?: boolean,
  ): Promise<DataSensor[]>;
}
