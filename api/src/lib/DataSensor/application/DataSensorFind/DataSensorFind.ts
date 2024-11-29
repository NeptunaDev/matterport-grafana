import { SensorId } from 'src/lib/Sensor/domain/SensorId';
import { DataSensorId } from '../../domain/DataSensorId';
import { DataSensorFilters } from '../../domain/DataSensorInterface';
import { DataSensorRepository } from '../../domain/DataSensorRepository';
import { DataSensorVariable } from '../../domain/DataSensorVariable';
import { DataSensorValue } from '../../domain/DataSensorValue';
import { DataSensorUnit } from '../../domain/DataSensorUnit';
import { DataSensor } from '../../domain/DataSensor';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';

export class DataSensorFind {
  constructor(private readonly repository: DataSensorRepository) {}

  async run(
    id?: string,
    idSensor?: string,
    variable?: string,
    value?: number,
    unit?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
    populatedIdSensor?: boolean,
    getLatest?: number,
  ): Promise<DataSensor[]> {
    const filters: DataSensorFilters = {
      ...(id && { id: new DataSensorId(id) }),
      ...(idSensor && { idSensor: new SensorId(idSensor) }),
      ...(variable && { variable: new DataSensorVariable(variable) }),
      ...(value && { value: new DataSensorValue(value) }),
      ...(unit && { unit: new DataSensorUnit(unit) }),
      ...(createdAt && { createdAt: new BaseDate(createdAt) }),
      ...(updatedAt && { updatedAt: new BaseDate(updatedAt) }),
      ...(deletedAt && { deletedAt: new BaseDate(deletedAt) }),
    };

    return this.repository.find(filters, populatedIdSensor, getLatest);
  }
}
