export class BaseId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidMongoId();
  }

  private ensureIsValidMongoId() {
    const isValidMongoId = /^[0-9a-fA-F]{24}$/.test(this.value);
    if (!isValidMongoId) {
      throw new Error(`Invalid MongoId: ${this.value}`);
    }
  }
}
