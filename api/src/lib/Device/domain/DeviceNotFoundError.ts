export class DeviceNotFoundError extends Error {
  constructor(id?: string) {
    const message = id ? `Device with id ${id} not found` : 'Device not found';
    super(message);
    this.name = 'DeviceNotFoundError';
  }
}
