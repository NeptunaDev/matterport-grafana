export class BaseUrl {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isEnsureValidUrl();
  }

  private isEnsureValidUrl() {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    const isValidUrl = urlPattern.test(this.value);
    if (!isValidUrl) {
      throw new Error(`Invalid Url: ${this.value}`);
    }
  }
}
