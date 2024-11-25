export class PlantNotFoundError extends Error {
  constructor(id?: string) {
    const message = id ? `Plant with id ${id} not found` : 'Plant not found';
    super(message);
    this.name = 'PlantNotFoundError';
  }
}
