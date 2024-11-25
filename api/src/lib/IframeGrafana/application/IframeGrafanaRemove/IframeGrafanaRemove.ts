import { IframeGrafanaId } from '../../domain/IframeGrafanaId';
import { IframeGrafanaNotFoundError } from '../../domain/IframeGrafanaNotFoundError';
import { IframeGrafanaRepository } from '../../domain/IframeGrafanaRepository';

export class IframeGrafanaRemove {
  constructor(private readonly repository: IframeGrafanaRepository) {}

  async run(id: string): Promise<void> {
    const iframeGrafanaId = new IframeGrafanaId(id);
    const iframeGrafana = await this.repository.findById(iframeGrafanaId);
    if (!iframeGrafana) throw new IframeGrafanaNotFoundError(id);
    await this.repository.remove(iframeGrafanaId);
  }
}
