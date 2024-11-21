import { SensorId } from '../../domain/SensorId';
import { SensorNotFoundError } from '../../domain/SensorNotFoundError';
import { SensorRepository } from '../../domain/SensorRepository';

export class SensorRemove {
  constructor(private readonly repository: SensorRepository) {}

  async run(id: string): Promise<void> {
    const sensorId = new SensorId(id);
    const sensor = await this.repository.findById(sensorId);
    if (!sensor) throw new SensorNotFoundError(id);
    await this.repository.remove(sensorId);
  }
}
