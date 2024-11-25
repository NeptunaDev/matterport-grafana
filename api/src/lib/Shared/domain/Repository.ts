import { BaseClass } from './BaseClass';
import { BaseId } from './BaseId';
import { BaseCreate, BaseEdit, BaseFilters } from './RepositoryDtos';

export interface Repository<ID extends BaseId, T extends BaseClass<ID>> {
  save(entity: BaseCreate<ID, T> | BaseEdit<ID, T>): Promise<void>;
  find(filters: BaseFilters<ID, T>): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
  remove(id: ID): Promise<void>;
}
