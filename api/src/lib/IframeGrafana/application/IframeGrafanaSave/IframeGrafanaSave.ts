import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import {
  IframeGrafanaCreateDto,
  IframeGrafanaUpdateDto,
} from '../../domain/IframeGrafana.dto';
import { IframeGrafanaRepository } from '../../domain/IframeGrafanaRepository';
import { PlantRepository } from 'src/lib/Plant/domain/PlantRepository';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import {
  IframeGrafanaCreate,
  IframeGrafanaEdit,
} from '../../domain/IframeGrafanaInterface';
import { IframeGrafanaUrl } from '../../domain/IframeGrafanaUrl';
import { IframeGrafanaOrder } from '../../domain/IframeGrafanaOrder';
import { IframeGrafanaId } from '../../domain/IframeGrafanaId';
import { IframeGrafanaNotFoundError } from '../../domain/IframeGrafanaNotFoundError';
import { PlantNotFoundError } from 'src/lib/Plant/domain/PlantNotFoundError';

export class IframeGrafanaSave {
  constructor(
    private readonly repository: IframeGrafanaRepository,
    private readonly plantRepository: PlantRepository,
  ) {}

  private async checkPlant(plantId: string) {
    const plant = await this.plantRepository.findById(new PlantId(plantId));
    if (!plant) throw new PlantNotFoundError(plantId);
  }

  async run(
    data: IframeGrafanaUpdateDto | IframeGrafanaCreateDto,
  ): Promise<void> {
    if (data instanceof IframeGrafanaCreateDto) {
      if (!data.idPlant) throw new MissingFieldError('idPlant');
      if (!data.url) throw new MissingFieldError('url');
      if (!data.order) throw new MissingFieldError('order');

      await this.checkPlant(data.idPlant);
      const dataCreate: IframeGrafanaCreate = {
        idPlant: new PlantId(data.idPlant),
        url: new IframeGrafanaUrl(data.url),
        order: new IframeGrafanaOrder(data.order),
      };
      return this.repository.save(dataCreate);
    }

    const iframeGrafanaId = new IframeGrafanaId(data.id);
    const iframeGrafana = await this.repository.findById(iframeGrafanaId);
    if (!iframeGrafana) throw new IframeGrafanaNotFoundError(data.id);

    if (data.idPlant && data.idPlant !== iframeGrafana.idPlant.value)
      await this.checkPlant(data.idPlant);

    const dataEdit: IframeGrafanaEdit = {
      id: iframeGrafanaId,
      idPlant: data.idPlant ? new PlantId(data.idPlant) : undefined,
      url: data.url ? new IframeGrafanaUrl(data.url) : undefined,
      order: data.order ? new IframeGrafanaOrder(data.order) : undefined,
    };

    return this.repository.save(dataEdit);
  }
}
