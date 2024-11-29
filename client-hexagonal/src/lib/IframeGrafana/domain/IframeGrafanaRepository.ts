import { Repository } from "../../Shared/domain/Repository";
import { IframeGrafana, IframeGrafanafind } from "./IframeGrafana";

export interface IframeGrafanaRepository extends Repository<IframeGrafana> {
  find(iframeGrafanafind?: IframeGrafanafind): Promise<IframeGrafana[]>;
}
