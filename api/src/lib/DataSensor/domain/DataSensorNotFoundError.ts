export class DataSensorNotFoundError extends Error {
  constructor(id?: string) {
    const message = id
      ? `DataSensor with id <${id}> not found`
      : 'DataSensor not found';
    super(message);
    this.name = 'DataSensorNotFoundError';
  }
}
