import { PlantId } from '../../domain/PlantId';
import { PlantNotFoundError } from '../../domain/PlantNotFoundError';
import { PlantRepository } from '../../domain/PlantRepository';

export class PlantRemove {
  constructor(private readonly repository: PlantRepository) {}

  async run(id: string): Promise<void> {
    const plant = await this.repository.findById(new PlantId(id));
    if (!plant) throw new PlantNotFoundError(id);
    return this.repository.remove(new PlantId(id));
  }
}
