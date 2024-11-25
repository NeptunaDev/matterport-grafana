import { DataSensorVariable } from '../../domain/DataSensorVariable';
import { DataSensorValue } from '../../domain/DataSensorValue';
import { DataSensorUnit } from '../../domain/DataSensorUnit';
import { SensorDocument } from 'src/lib/Sensor/infrastructure/Mongo/MongoSensorSchema';
import { Sensor } from 'src/lib/Sensor/domain/Sensor';
import { SensorId } from 'src/lib/Sensor/domain/SensorId';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { DataSensorDocument } from './MongoDataSensorSchema';
import { DataSensor } from '../../domain/DataSensor';
import mongoose from 'mongoose';
import { MongoSensorService } from 'src/lib/Sensor/infrastructure/Mongo/MongoSensorService';
import { DataSensorId } from '../../domain/DataSensorId';

export class MongoDataSensorService {
  static toDomain(dataSensor: DataSensorDocument): DataSensor {
    if (!dataSensor) return null;
    const sensorPopulated = dataSensor.idSensor as
      | SensorDocument
      | mongoose.Types.ObjectId;

    let sensorId: SensorId;
    let sensor: Sensor;
    if (!sensorPopulated) return;

    if (sensorPopulated instanceof mongoose.Types.ObjectId) {
      sensorId = new SensorId(sensorPopulated.toString());
    } else {
      sensorId = new SensorId(sensorPopulated._id.toString());

      sensor = MongoSensorService.toDomain(sensorPopulated);
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
}
