export class DeviceTag {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidName();
  }

  private ensureIsValidName() {
    const isValidName =
      /^[a-zA-Z0-9 ,.!?&(){}[\]“”'"\\/^$#@;_:+-=<>"|`~]{1,30}$/.test(
        this.value,
      );
    if (!isValidName) {
      throw new Error(`Invalid tag: ${this.value}`);
    }
  }
}
