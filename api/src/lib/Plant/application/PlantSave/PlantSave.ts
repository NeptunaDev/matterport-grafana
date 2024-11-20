import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { PlantId } from '../../domain/PlantId';
import { PlantCreate, PlantEdit } from '../../domain/PlantInterfaces';
import { PlantMatterportSid } from '../../domain/PlantMatterportSid';
import { PlantName } from '../../domain/PlantName';
import { PlantNotFoundError } from '../../domain/PlantNotFoundError';
import { PlantRepository } from '../../domain/PlantRepository';

export class PlantSave {
  constructor(private readonly repository: PlantRepository) {}

  async run(id?: string, matterportSid?: string, name?: string): Promise<void> {
    if (!id) {
      if (!matterportSid)
        throw new MissingFieldError('MatterportSid is required');
      if (!name) throw new MissingFieldError('Name is required');

      const dataCreate: PlantCreate = {
        matterportSid: new PlantMatterportSid(matterportSid),
        name: new PlantName(name),
      };
      return this.repository.save(dataCreate);
    }
    const plant = await this.repository.findById(new PlantId(id));
    if (!plant) throw new PlantNotFoundError(id);
    const dataEdit: PlantEdit = {
      id: plant.id,
      ...(matterportSid && {
        matterportSid: new PlantMatterportSid(matterportSid),
      }),
      ...(name && { name: new PlantName(name) }),
    };
    return this.repository.save(dataEdit);
  }
}
