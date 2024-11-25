export interface Repository<T> {
  find(): T[];
  save(plant: Partial<Omit<T, "createdAt" | "updatedAt">>): void;
  remove(id: string): void;
}
