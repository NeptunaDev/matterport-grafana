import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { PlantId } from '../../domain/PlantId';
import { PlantCreate, PlantEdit } from '../../domain/PlantInterfaces';
import { PlantMatterportSid } from '../../domain/PlantMatterportSid';
import { PlantName } from '../../domain/PlantName';
import { PlantNotFoundError } from '../../domain/PlantNotFoundError';
import { PlantRepository } from '../../domain/PlantRepository';
import { PlantMatterportSidExisting } from '../../domain/PlantMatterportSidExisting';

export class PlantSave {
  constructor(private readonly repository: PlantRepository) {}

  private async checkMatterportSid(matterportSid: string): Promise<void> {
    const existingPlant = await this.repository.find({
      matterportSid: new PlantMatterportSid(matterportSid),
    });
    if (existingPlant.length > 0)
      throw new PlantMatterportSidExisting(matterportSid);
  }

  async run(id?: string, matterportSid?: string, name?: string): Promise<void> {
    if (!id) {
      if (!matterportSid)
        throw new MissingFieldError('MatterportSid is required');
      if (!name) throw new MissingFieldError('Name is required');

      await this.checkMatterportSid(matterportSid);

      const dataCreate: PlantCreate = {
        matterportSid: new PlantMatterportSid(matterportSid),
        name: new PlantName(name),
      };
      return this.repository.save(dataCreate);
    }
    const plant = await this.repository.findById(new PlantId(id));
    if (!plant) throw new PlantNotFoundError(id);

    if (matterportSid && plant.matterportSid.value !== matterportSid)
      await this.checkMatterportSid(matterportSid);

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
