import { Coordinates } from 'src/lib/Shared/domain/Coordinates';

export class DevicePlace {
  value: Coordinates;

  constructor(value: Coordinates) {
    this.value = value;
    this.ensureIsValidName();
  }

  private ensureIsValidName() {
    if (!this.value) {
      throw new Error('Device place is required');
    }
    if (this.value.length !== 2) {
      throw new Error('Invalid device place');
    }
  }
}
