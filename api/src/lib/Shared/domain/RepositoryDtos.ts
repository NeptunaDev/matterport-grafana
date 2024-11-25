import { BaseClass } from './BaseClass';
import { BaseId } from './BaseId';

export type OmitMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type BaseFilters<
  ID extends BaseId,
  T extends BaseClass<ID>,
> = Partial<T>;

export type BaseCreate<ID extends BaseId, T extends BaseClass<ID>> = Pick<
  T,
  Exclude<OmitMethods<T>, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

export type BaseEdit<ID extends BaseId, T extends BaseClass<ID>> = Partial<
  BaseCreate<ID, T>
> & { id: ID };

export function isBaseCreate<ID extends BaseId, T extends BaseClass<ID>>(
  entity: BaseCreate<ID, T> | BaseEdit<ID, T>,
): entity is BaseCreate<ID, T> {
  return !(entity as BaseEdit<ID, T>).id; // If it doesn't have an `id`, it's a BaseCreate
}
