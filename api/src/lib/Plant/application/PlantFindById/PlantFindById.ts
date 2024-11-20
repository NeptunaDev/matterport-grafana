import { Plant } from '../../domain/Plant';
import { PlantId } from '../../domain/PlantId';
import { PlantRepository } from '../../domain/PlantRepository';

export class PlantFindById {
  constructor(private readonly repository: PlantRepository) {}

  async run(id: string): Promise<Plant | null> {
    return this.repository.findById(new PlantId(id));
  }
}
