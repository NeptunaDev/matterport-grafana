import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { SensorType } from '../../domain/SensorType';
import { SensorTypeId } from '../../domain/SensorTypeId';
import { SensorTypeFilters } from '../../domain/SensorTypeInterfaces';
import { SensorTypeRepository } from '../../domain/SensorTypeRepository';
import { SensorTypeType } from '../../domain/SensorTypeType';

export class SensorTypeFind {
  constructor(private readonly repository: SensorTypeRepository) {}
  async run(
    id: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  ): Promise<SensorType[]> {
    const filters: SensorTypeFilters = {
      ...(id && { id: new SensorTypeId(id) }),
      ...(type && { type: new SensorTypeType(type) }),
      ...(createdAt && { createdAt: new BaseDate(createdAt) }),
      ...(updatedAt && { updatedAt: new BaseDate(updatedAt) }),
      ...(deletedAt && { deletedAt: new BaseDate(createdAt) }),
    };

    return this.repository.find(filters);
  }
}
