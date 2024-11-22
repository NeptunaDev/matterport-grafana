export class IframeGrafanaOrder {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.isEnsureValidOrder();
  }

  private isEnsureValidOrder() {
    if (this.value < 0) {
      throw new Error(`Invalid Order: ${this.value}`);
    }
  }
}
