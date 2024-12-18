export class SensorTypeType {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidName();
  }

  private ensureIsValidName() {
    const isValidName = /^[a-zA-ZÀ-ÿ0-9 ]{1,60}$/.test(this.value);
    if (!isValidName) {
      throw new Error(`Invalid name: ${this.value}`);
    }
  }
}
