import { Coordinates } from './Coordinates';

export class BasePlace {
  value: Coordinates;

  constructor(value: Coordinates) {
    this.value = value;
    this.ensureIsValidName();
  }

  private ensureIsValidName() {
    if (!this.value) {
      throw new Error('Place is required');
    }
    if (this.value.length !== 2) {
      throw new Error('Invalid place');
    }
  }
}
