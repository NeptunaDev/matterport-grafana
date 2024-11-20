import { BaseClass } from './BaseClass';
import { BaseId } from './BaseId';

export type BaseFilters<
  ID extends BaseId,
  T extends BaseClass<ID>,
> = Partial<T>;

export type BaseCreate<ID extends BaseId, T extends BaseClass<ID>> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type BaseEdit<ID extends BaseId, T extends BaseClass<ID>> = Partial<
  BaseCreate<ID, T>
> & { id: ID };
