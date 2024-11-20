import { BaseClass } from 'src/lib/Shared/domain/BaseClass';
import { DataSensorId } from './DataSensorId';
import { SensorId } from 'src/lib/Sensor/domain/SensorId';
import { DataSensorVariable } from './DataSensorVariable';
import { DataSensorValue } from './DataSensorValue';
import { DataSensorUnit } from './DataSensorUnit';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

export class DataSensor extends BaseClass<DataSensorId> {
  idSensor: SensorId;
  variable: DataSensorVariable;
  value: DataSensorValue;
  unit: DataSensorUnit;

  constructor(
    id: DataSensorId,
    idSensor: SensorId,
    variable: DataSensorVariable,
    value: DataSensorValue,
    unit: DataSensorUnit,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.idSensor = idSensor;
    this.variable = variable;
    this.value = value;
    this.unit = unit;
  }
}
