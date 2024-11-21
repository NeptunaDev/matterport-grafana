import { DataSensorId } from 'src/lib/DataSensor/domain/DataSensorId';
import {
  DataSensorCreate,
  DataSensorEdit,
} from 'src/lib/DataSensor/domain/DataSensorInterface';
import { DataSensorRepository } from 'src/lib/DataSensor/domain/DataSensorRepository';
import { DataSensorUnit } from 'src/lib/DataSensor/domain/DataSensorUnit';
import { DataSensorValue } from 'src/lib/DataSensor/domain/DataSensorValue';
import { DataSensorVariable } from 'src/lib/DataSensor/domain/DataSensorVariable';
import { SensorId } from 'src/lib/Sensor/domain/SensorId';
import { SensorNotFoundError } from 'src/lib/Sensor/domain/SensorNotFoundError';
import { SensorRepository } from 'src/lib/Sensor/domain/SensorRepository';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { DataSensorNotFoundError } from '../../domain/DataSensorNotFoundError';

export class DataSensorSave {
  constructor(
    private readonly repository: DataSensorRepository,
    private readonly sensorRepository: SensorRepository,
  ) {}

  private async checkSensor(idSensor: string): Promise<void> {
    const sensor = await this.sensorRepository.findById(new SensorId(idSensor));
    if (!sensor) throw new SensorNotFoundError(idSensor);
  }

  async run(
    id?: string,
    idSensor?: string,
    variable?: string,
    value?: number,
    unit?: string,
  ) {
    if (!id) {
      if (!idSensor) throw new MissingFieldError('idSensor');
      if (!variable) throw new MissingFieldError('variable');
      if (!value) throw new MissingFieldError('value');
      if (!unit) throw new MissingFieldError('unit');

      await this.checkSensor(idSensor);
      const dataCreate: DataSensorCreate = {
        idSensor: new SensorId(idSensor),
        variable: new DataSensorVariable(variable),
        value: new DataSensorValue(value),
        unit: new DataSensorUnit(unit),
      };
      return this.repository.save(dataCreate);
    }

    const dataSensorId = new DataSensorId(id);
    const dataSensor = await this.repository.findById(dataSensorId);
    if (!dataSensor) throw new DataSensorNotFoundError(id);

    if (idSensor && dataSensor.idSensor.value !== idSensor)
      await this.checkSensor(idSensor);

    const dataEdit: DataSensorEdit = {
      id: dataSensorId,
      ...(idSensor && { idSensor: new SensorId(idSensor) }),
      ...(variable && { variable: new DataSensorVariable(variable) }),
      ...(value && { value: new DataSensorValue(value) }),
      ...(unit && { unit: new DataSensorUnit(unit) }),
    };

    return this.repository.save(dataEdit);
  }
}
