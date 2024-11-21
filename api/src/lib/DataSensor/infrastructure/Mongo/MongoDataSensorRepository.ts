import { InjectModel } from '@nestjs/mongoose';
import { DataSensorRepository } from '../../domain/DataSensorRepository';
import { DataSensorDocument, MongoDataSensor } from './MongoDataSensorSchema';
import mongoose, { Model } from 'mongoose';
import { DataSensor } from '../../domain/DataSensor';
import { SensorDocument } from 'src/lib/Sensor/infrastructure/Mongo/MongoSensorSchema';
import { Sensor } from 'src/lib/Sensor/domain/Sensor';
import { SensorId } from 'src/lib/Sensor/domain/SensorId';
import { SensorTypeId } from 'src/lib/SensorType/domain/SensorTypeId';
import { DeviceId } from 'src/lib/Device/domain/DeviceId';
import { SensorPlace } from 'src/lib/Sensor/domain/SensorPlace';
import { SensorVector } from 'src/lib/Sensor/domain/SensorVector';
import { SensorDescription } from 'src/lib/Sensor/domain/SensorDescription';
import { SensorTitle } from 'src/lib/Sensor/domain/SensorTitle';
import { SensorColor } from 'src/lib/Sensor/domain/SensorColor';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { DataSensorId } from '../../domain/DataSensorId';
import { DataSensorVariable } from '../../domain/DataSensorVariable';
import { DataSensorValue } from '../../domain/DataSensorValue';
import { DataSensorUnit } from '../../domain/DataSensorUnit';
import { isBaseCreate } from 'src/lib/Shared/domain/RepositoryDtos';
import {
  DataSensorCreate,
  DataSensorEdit,
  DataSensorFilters,
} from '../../domain/DataSensorInterface';

export class MongoDataSensorRepository implements DataSensorRepository {
  constructor(
    @InjectModel(MongoDataSensor.name)
    private readonly model: Model<MongoDataSensor>,
  ) {}

  private toDomain(dataSensor: DataSensorDocument): DataSensor {
    const sensorPopulated = dataSensor.idSensor as
      | SensorDocument
      | mongoose.Types.ObjectId;

    let sensorId: SensorId;
    let sensor: Sensor;

    if (sensorPopulated instanceof mongoose.Types.ObjectId) {
      sensorId = new SensorId(sensorPopulated.toString());
    } else {
      sensorId = new SensorId(sensorPopulated._id.toString());
      console.log(sensorPopulated.idType);

      sensor = new Sensor(
        sensorId,
        new SensorTypeId(sensorPopulated.idType.toString()),
        new DeviceId(sensorPopulated.idDevice.toString()),
        new SensorPlace(sensorPopulated.place as Coordinates),
        new SensorVector(sensorPopulated.vector as Coordinates),
        new SensorTitle(sensorPopulated.title),
        new SensorDescription(sensorPopulated.description),
        new SensorColor(sensorPopulated.color),
        new BaseDate(sensorPopulated.createdAt),
        new BaseDate(sensorPopulated.updatedAt),
        new BaseDate(sensorPopulated.deletedAt),
      );
    }

    return new DataSensor(
      new DataSensorId(dataSensor._id.toString()),
      sensorId,
      new DataSensorVariable(dataSensor.variable),
      new DataSensorValue(dataSensor.value),
      new DataSensorUnit(dataSensor.unit),
      new BaseDate(dataSensor.createdAt),
      new BaseDate(dataSensor.updatedAt),
      dataSensor.deletedAt ? new BaseDate(dataSensor.deletedAt) : null,
      sensor,
    );
  }

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
      ...(filter.idSensor && { idSensor: filter.idSensor.value }),
      ...(filter.variable && { variable: filter.variable.value }),
      ...(filter.value && { value: filter.value.value }),
      ...(filter.unit && { unit: filter.unit.value }),
    });

    if (populatedIdSensor) query.populate('idSensor');
    const dataSensors = await query.exec();

    return dataSensors.map(this.toDomain);
  }

  async findById(id: DataSensorId): Promise<DataSensor> {
    return this.model.findOne({
      _id: id.value,
      deletedAt: { $eq: null },
    });
  }

  async remove(id: DataSensorId): Promise<void> {
    await this.model.updateOne({ _id: id.value }, { deletedAt: new Date() });
  }
}
