import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { IframeGrafanaFindDto } from '../../domain/IframeGrafana.dto';
import { IframeGrafanaId } from '../../domain/IframeGrafanaId';
import { IframeGrafanaRepository } from '../../domain/IframeGrafanaRepository';
import { IframeGrafanaUrl } from '../../domain/IframeGrafanaUrl';
import { IframeGrafanaOrder } from '../../domain/IframeGrafanaOrder';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { IframeGrafanaPopulates } from '../../domain/IframeGrafanaInterface';
import { IframeGrafana } from '../../domain/IframeGrafana';

export class IframeGrafanaFind {
  constructor(private readonly repository: IframeGrafanaRepository) {}

  async run(filters: IframeGrafanaFindDto): Promise<IframeGrafana[]> {
    const { populateIdPlant } = filters;
    const populates: IframeGrafanaPopulates = [];
    populateIdPlant && populates.push('idPlant');

    return this.repository.find(
      {
        id: filters.id ? new IframeGrafanaId(filters.id) : undefined,
        idPlant: filters.idPlant ? new PlantId(filters.idPlant) : undefined,
        url: filters.url ? new IframeGrafanaUrl(filters.url) : undefined,
        order: filters.order
          ? new IframeGrafanaOrder(filters.order)
          : undefined,
        createdAt: filters.createdAt
          ? new BaseDate(filters.createdAt)
          : undefined,
        updatedAt: filters.updatedAt
          ? new BaseDate(filters.updatedAt)
          : undefined,
        deletedAt: filters.deletedAt
          ? new BaseDate(filters.deletedAt)
          : undefined,
      },
      populates,
    );
  }
}
