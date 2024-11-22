import { Repository } from 'src/lib/Shared/domain/Repository';
import { IframeGrafanaId } from './IframeGrafanaId';
import { IframeGrafana } from './IframeGrafana';
import {
  IframeGrafanaFilter,
  IframeGrafanaPopulates,
} from './IframeGrafanaInterface';

export interface IframeGrafanaRepository
  extends Repository<IframeGrafanaId, IframeGrafana> {
  find(
    filters: IframeGrafanaFilter,
    populates?: IframeGrafanaPopulates,
  ): Promise<IframeGrafana[]>;
}
