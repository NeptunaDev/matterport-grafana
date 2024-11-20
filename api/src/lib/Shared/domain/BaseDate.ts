export class BaseDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValidDate();
  }

  private ensureIsValidDate(referenceDate?: Date) {
    if (isNaN(this.value.getTime())) {
      throw new Error(`Invalid Date: ${this.value.toString()}`);
    }

    const currentData = new Date();
    if (this.value > currentData) {
      throw new Error(`Date cannot be in the future: ${this.value}`);
    }

    if (referenceDate && this.value < referenceDate) {
      throw new Error(
        `Date cannot be before the reference date: ${this.value}`,
      );
    }
  }
}
