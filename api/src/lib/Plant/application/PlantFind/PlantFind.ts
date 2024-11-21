import { PlantRepository } from 'src/lib/Plant/domain/PlantRepository';
import { PlantId } from '../../domain/PlantId';
import { PlantMatterportSid } from '../../domain/PlantMatterportSid';
import { PlantName } from '../../domain/PlantName';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { Plant } from '../../domain/Plant';
import { PlantFilters } from '../../domain/PlantInterfaces';

export class PlantFind {
  constructor(private readonly repository: PlantRepository) {}

  async run(
    id?: string,
    matterportSid?: string,
    name?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
  ): Promise<Plant[]> {
    const filters: PlantFilters = {
      ...(id && { id: new PlantId(id) }),
      ...(matterportSid && {
        matterportSid: new PlantMatterportSid(matterportSid),
      }),
      ...(name && { name: new PlantName(name) }),
      ...(createdAt && { createdAt: new BaseDate(createdAt) }),
      ...(updatedAt && { updatedAt: new BaseDate(updatedAt) }),
      ...(deletedAt && { deletedAt: new BaseDate(deletedAt) }),
    };
    return this.repository.find(filters);
  }
}
