export class BaseDescription {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidDescription();
  }

  private ensureIsValidDescription() {
    if (this.value.length === 0) {
      throw new Error('Description cannot be empty');
    }

    if (this.value.length > 500) {
      throw new Error('Description cannot be longer than 500 characters');
    }
  }
}
