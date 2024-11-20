export class DataSensorVariable {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidValue();
  }

  private ensureIsValidValue() {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new Error('DataSensorVariable value is invalid');
    }
  }
}
