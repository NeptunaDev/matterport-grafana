import {
  BaseCreate,
  BaseEdit,
  BaseFilters,
} from 'src/lib/Shared/domain/RepositoryDtos';
import { Plant } from './Plant';
import { PlantId } from './PlantId';

export interface PlantFilters extends BaseFilters<PlantId, Plant> {}

export interface PlantCreate extends BaseCreate<PlantId, Plant> {}

export interface PlantEdit extends BaseEdit<PlantId, Plant> {}
