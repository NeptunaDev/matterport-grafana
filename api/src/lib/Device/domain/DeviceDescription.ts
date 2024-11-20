export class DeviceDescription {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidName();
  }

  private ensureIsValidName() {
    const isValidName = /^[a-zA-Z0-9 ]+$/.test(this.value);
    if (!isValidName) {
      throw new Error(`Invalid name: ${this.value}`);
    }
  }
}
