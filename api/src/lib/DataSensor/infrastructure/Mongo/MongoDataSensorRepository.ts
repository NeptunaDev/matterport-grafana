import { InjectModel } from '@nestjs/mongoose';
import { DataSensorRepository } from '../../domain/DataSensorRepository';
import { DataSensorDocument, MongoDataSensor } from './MongoDataSensorSchema';
import { Model } from 'mongoose';
import { DataSensor } from '../../domain/DataSensor';
import { DataSensorId } from '../../domain/DataSensorId';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import {
  DataSensorCreate,
  DataSensorEdit,
  DataSensorFilters,
} from '../../domain/DataSensorInterface';
import { MongoDataSensorService } from './MongoDataSensorService';

export class MongoDataSensorRepository implements DataSensorRepository {
  constructor(
    @InjectModel(MongoDataSensor.name)
    private readonly model: Model<MongoDataSensor>,
  ) {}

  async save(entity: DataSensorCreate | DataSensorEdit): Promise<void> {
    if (isBaseCreate(entity)) {
      await this.model.create({
        idSensor: entity.idSensor.value,
        variable: entity.variable.value,
        value: entity.value.value,
        unit: entity.unit.value,
      });
      return;
    } else {
      const { id, idSensor, variable, value, unit } = entity as DataSensorEdit;

      await this.model.updateOne(
        { _id: id.value },
        {
          ...(idSensor && { idSensor: idSensor.value }),
          ...(variable && { variable: variable.value }),
          ...(value && { value: value.value }),
          ...(unit && { unit: unit.value }),
        },
      );
    }
  }

  async find(
    filter: DataSensorFilters,
    populatedIdSensor?: boolean,
  ): Promise<DataSensor[]> {
    const query = this.model.find({
      deletedAt: filter.deletedAt?.value ?? { $eq: null },
      ...(filter.id && { _id: filter.id.value }),
      ...(filter.idSensor && { idSensor: filter.idSensor.value }),
      ...(filter.variable && { variable: filter.variable.value }),
      ...(filter.value && { value: filter.value.value }),
      ...(filter.unit && { unit: filter.unit.value }),
    });

    if (populatedIdSensor) query.populate('idSensor');
    const dataSensors = await query.exec();

    return dataSensors.map(MongoDataSensorService.toDomain);
  }

  async findById(id: DataSensorId): Promise<DataSensor> {
    const dataSensor = await this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
    return MongoDataSensorService.toDomain(dataSensor as DataSensorDocument);
  }

  async remove(id: DataSensorId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
