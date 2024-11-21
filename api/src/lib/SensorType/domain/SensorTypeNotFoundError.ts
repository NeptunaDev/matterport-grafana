export class SensorTypeNotFoundError extends Error {
  constructor(id?: string) {
    const message = id
      ? `Sensor Type with id <${id}> not found`
      : 'Sensor Type not found';
    super(message);
    this.name = 'SensorTypeNotFoundError';
  }
}
