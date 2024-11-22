import { BaseUrl } from 'src/lib/Shared/domain/BaseUrl';

export class IframeGrafanaUrl extends BaseUrl {
  value: string;

  constructor(value: string) {
    super(value);
  }
}
