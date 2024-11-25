export class IframeGrafanaNotFoundError extends Error {
  constructor(id?: string) {
    const message = id
      ? `IframeGrafana with id <${id}> not found`
      : 'IframeGrafana not found';
    super(message);
    this.name = 'IframeGrafanaNotFoundError';
  }
}
