import { DataSensorId } from '../../domain/DataSensorId';
import { DataSensorNotFoundError } from '../../domain/DataSensorNotFoundError';
import { DataSensorRepository } from '../../domain/DataSensorRepository';

export class DataSensorRemove {
  constructor(private readonly repository: DataSensorRepository) {}

  async run(id: string): Promise<void> {
    const dataSensorId = new DataSensorId(id);
    const dataSensor = await this.repository.findById(dataSensorId);
    if (!dataSensor) throw new DataSensorNotFoundError(id);
    return this.repository.remove(dataSensorId);
  }
}
