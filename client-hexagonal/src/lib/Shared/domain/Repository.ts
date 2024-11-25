export interface Repository<T> {
  find(): T[];
  save(plant: T): void;
  remove(id: string): void;
}