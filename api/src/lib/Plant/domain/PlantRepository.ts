import { Repository } from 'src/lib/Shared/domain/Repository';
import { PlantId } from './PlantId';
import { Plant } from './Plant';

export interface PlantRepository extends Repository<PlantId, Plant> {}
