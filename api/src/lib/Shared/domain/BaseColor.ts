export class BaseColor {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidColor();
  }

  private ensureIsValidColor() {
    const isValidColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.value);
    if (!isValidColor) {
      throw new Error(`Invalid color: ${this.value}`);
    }
  }
}
