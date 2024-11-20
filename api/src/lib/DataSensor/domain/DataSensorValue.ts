export class DataSensorValue {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValidValue();
  }

  private ensureIsValidValue() {
    if (this.value === null || this.value === undefined) {
      throw new Error('DataSensorValue value is invalid');
    }
  }
}
