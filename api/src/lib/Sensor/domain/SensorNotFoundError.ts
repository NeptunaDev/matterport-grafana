export class SensorNotFoundError extends Error {
  constructor(id?: string) {
    const message = id
      ? `Sensor with id <${id}> not found`
      : 'Sensor not found';
    super(message);
    this.name = 'SensorNotFoundError';
  }
}
