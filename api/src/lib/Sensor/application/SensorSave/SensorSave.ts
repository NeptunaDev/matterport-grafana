import { SensorTypeRepository } from 'src/lib/SensorType/domain/SensorTypeRepository';
import { SensorRepository } from '../../domain/SensorRepository';
import { DeviceRepository } from 'src/lib/Device/domain/DeviceRepository';
import { SensorTypeId } from 'src/lib/SensorType/domain/SensorTypeId';
import { DeviceNotFoundError } from 'src/lib/Device/domain/DeviceNotFoundError';
import { DeviceId } from 'src/lib/Device/domain/DeviceId';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { SensorCreate, SensorEdit } from '../../domain/SensorInterface';
import { SensorPlace } from '../../domain/SensorPlace';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { SensorVector } from '../../domain/SensorVector';
import { SensorTitle } from '../../domain/SensorTitle';
import { SensorDescription } from '../../domain/SensorDescription';
import { SensorColor } from '../../domain/SensorColor';
import { SensorTypeNotFoundError } from 'src/lib/SensorType/domain/SensorTypeNotFoundError';
import { SensorNotFoundError } from '../../domain/SensorNotFoundError';
import { SensorId } from '../../domain/SensorId';

export class SensorSave {
  constructor(
    private readonly repository: SensorRepository,
    private readonly sensorTypeRepository: SensorTypeRepository,
    private readonly deviceRepository: DeviceRepository,
  ) {}

  private async checkSensorType(idType: string): Promise<void> {
    const sensorType = await this.sensorTypeRepository.findById(
      new SensorTypeId(idType),
    );
    if (!sensorType) throw new SensorTypeNotFoundError(idType);
  }

  private async checkDevice(idDevice: string): Promise<void> {
    const device = await this.deviceRepository.findById(new DeviceId(idDevice));
    if (!device) throw new DeviceNotFoundError(idDevice);
  }

  async run(
    id: string,
    idType: string,
    idDevice: string,
    place: Coordinates,
    vector: Coordinates,
    title: string,
    description: string,
    color: string,
  ): Promise<void> {
    if (!id) {
      if (!idType) throw new MissingFieldError('idType');
      if (!idDevice) throw new MissingFieldError('idDevice');
      if (!place) throw new MissingFieldError('place');
      if (!vector) throw new MissingFieldError('vector');
      if (!title) throw new MissingFieldError('title');
      if (!description) throw new MissingFieldError('description');
      if (!color) throw new MissingFieldError('color');

      await this.checkSensorType(idType);
      await this.checkDevice(idDevice);

      const dataCreate: SensorCreate = {
        idType: new SensorTypeId(idType),
        idDevice: new DeviceId(idDevice),
        place: new SensorPlace(place),
        vector: new SensorVector(vector),
        title: new SensorTitle(title),
        description: new SensorDescription(description),
        color: new SensorColor(color),
      };

      return await this.repository.save(dataCreate);
    }

    const sensorId = new SensorId(id);
    const sensor = await this.repository.findById(sensorId);
    if (!sensor) throw new SensorNotFoundError(id);

    if (idType && sensor.idType.value !== idType)
      await this.checkSensorType(idType);
    if (idDevice && sensor.idDevice.value !== idDevice)
      await this.checkDevice(idDevice);

    const dataEdit: SensorEdit = {
      id: sensorId,
      ...(idType && { idType: new SensorTypeId(idType) }),
      ...(idDevice && { idDevice: new DeviceId(idDevice) }),
      ...(place && { place: new SensorPlace(place) }),
      ...(vector && { vector: new SensorVector(vector) }),
      ...(title && { title: new SensorTitle(title) }),
      ...(description && { description: new SensorDescription(description) }),
      ...(color && { color: new SensorColor(color) }),
    };

    return await this.repository.save(dataEdit);
  }
}
