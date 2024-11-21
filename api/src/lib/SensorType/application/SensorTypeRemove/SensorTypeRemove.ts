import { SensorTypeId } from '../../domain/SensorTypeId';
import { SensorTypeNotFoundError } from '../../domain/SensorTypeNotFoundError';
import { SensorTypeRepository } from '../../domain/SensorTypeRepository';

export class SensorTypeRemove {
  constructor(private readonly repository: SensorTypeRepository) {}

  async run(id: string): Promise<void> {
    const sensorTypeid = new SensorTypeId(id);
    const sensorType = await this.repository.findById(sensorTypeid);
    if (!sensorType) throw new SensorTypeNotFoundError(id);
    this.repository.remove(sensorTypeid);
  }
}
