import { InjectModel } from '@nestjs/mongoose';
import { IframeGrafanaRepository } from '../../domain/IframeGrafanaRepository';
import {
  MongoIframeGrafana,
  MongoIframeGrafanaDocumet,
} from './MongoIframeGrafanaSchema';
import { Model } from 'mongoose';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import {
  IframeGrafanaCreate,
  IframeGrafanaEdit,
} from '../../domain/IframeGrafanaInterface';
import { IframeGrafana } from '../../domain/IframeGrafana';
import { IframeGrafanaId } from '../../domain/IframeGrafanaId';
import { MongoIframeGrafanaService } from './MongoIframeGrafanaService';

export class MongoIframeGrafanaRepository implements IframeGrafanaRepository {
  constructor(
    @InjectModel(MongoIframeGrafana.name)
    private readonly model: Model<MongoIframeGrafana>,
  ) {}

  async save(entity: IframeGrafanaCreate | IframeGrafanaEdit): Promise<void> {
    if (isBaseCreate(entity)) {
      await this.model.create({
        idPlant: entity.idPlant.value,
        url: entity.url.value,
        order: entity.order.value,
      });
      return;
    }

    const { id, idPlant, url, order } = entity as IframeGrafanaEdit;
    await this.model.updateOne(
      { _id: id.value },
      {
        ...(idPlant && { idPlant: idPlant.value }),
        ...(url && { url: url.value }),
        ...(order && { order: order.value }),
      },
    );
  }

  async find(
    filters: Partial<IframeGrafana>,
    populates: string[],
  ): Promise<IframeGrafana[]> {
    const query = this.model.find({
      deletedAt: filters.deletedAt?.value ?? { $eq: null },
      ...(filters.id && { _id: filters.id.value }),
      ...(filters.idPlant && { idPlant: filters.idPlant.value }),
      ...(filters.url && { url: filters.url.value }),
      ...(filters.order && { order: filters.order.value }),
      ...(filters.createdAt && { createdAt: filters.createdAt.value }),
      ...(filters.updatedAt && { updatedAt: filters.updatedAt.value }),
    });

    for (const populate of populates) {
      query.populate(populate);
    }

    const iframeGrafanas = await query.exec();
    return iframeGrafanas.map(MongoIframeGrafanaService.toDomain);
  }

  async findById(id: IframeGrafanaId): Promise<IframeGrafana> {
    const iframeGrafana = await this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
    return MongoIframeGrafanaService.toDomain(
      iframeGrafana as MongoIframeGrafanaDocumet,
    );
  }

  async remove(id: IframeGrafanaId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
