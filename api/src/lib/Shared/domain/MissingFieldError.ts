export class MissingFieldError extends Error {
  constructor(field: string) {
    super(`${field} is required`);
    this.name = 'MissingFieldError';
  }
}
