export interface Repository<T> {
  find(): Promise<T[]>;
  save(plant: Partial<Omit<T, "createdAt" | "updatedAt">>): Promise<void>;
  remove(id: string): Promise<void>;
}
