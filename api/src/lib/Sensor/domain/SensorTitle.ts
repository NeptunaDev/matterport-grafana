export class SensorTitle {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidTitle();
  }

  private ensureIsValidTitle() {
    if (this.value.length === 0) {
      throw new Error('Title cannot be empty');
    }

    if (this.value.length > 100) {
      throw new Error('Title cannot be longer than 100 characters');
    }
  }
}
