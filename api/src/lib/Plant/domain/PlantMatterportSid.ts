export class PlantMatterportSid {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidMatterportSid();
  }

  private ensureIsValidMatterportSid() {
    const sidPattern = /^[a-zA-Z0-9]{1,12}$/;
    const isValidMatterportSid = sidPattern.test(this.value);
    if (!isValidMatterportSid) {
      throw new Error(`Invalid MatterportSid: ${this.value}`);
    }
  }
}
