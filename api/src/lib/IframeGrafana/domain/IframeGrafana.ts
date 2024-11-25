import { IframeGrafanaId } from './IframeGrafanaId';
import { BaseClass } from 'src/lib/Shared/domain/BaseClass';
import {} from './IframeGrafanaInterface';
import { IframeGrafanaOrder } from './IframeGrafanaOrder';
import { IframeGrafanaUrl } from './IframeGrafanaUrl';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { Plant } from 'src/lib/Plant/domain/Plant';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

interface IframeGrafanaInterface {
  id: IframeGrafanaId;
  idPlant: PlantId;
  url: IframeGrafanaUrl;
  order: IframeGrafanaOrder;
  createdAt: BaseDate;
  updatedAt: BaseDate;
  deletedAt?: BaseDate;

  plant?: Plant;
}

export class IframeGrafana extends BaseClass<IframeGrafanaId> {
  readonly idPlant: PlantId;
  readonly url: IframeGrafanaUrl;
  readonly order: IframeGrafanaOrder;

  readonly plant?: Plant;

  constructor(params: IframeGrafanaInterface) {
    super(params.id, params.createdAt, params.updatedAt, params.deletedAt);
    this.idPlant = params.idPlant;
    this.url = params.url;
    this.order = params.order;
    if (params.plant) this.plant = params.plant;
  }
}
