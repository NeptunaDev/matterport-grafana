import { Repository } from 'src/lib/Shared/domain/Repository';
import { IframeGrafanaId } from './IframeGrafanaId';
import { IframeGrafana } from './IframeGrafana';

export interface IframeGrafanaRepository
  extends Repository<IframeGrafanaId, IframeGrafana> {}
