import {
  BaseCreate,
  BaseEdit,
  BaseFilters,
} from 'src/lib/Shared/domain/RepositoryDtos';
import { IframeGrafanaId } from './IframeGrafanaId';
import { IframeGrafana } from './IframeGrafana';

export interface IframeGrafanaFilter
  extends BaseFilters<IframeGrafanaId, IframeGrafana> {}
export interface IframeGrafanaCreate
  extends BaseCreate<IframeGrafanaId, IframeGrafana> {}
export interface IframeGrafanaEdit
  extends BaseEdit<IframeGrafanaId, IframeGrafana> {}
