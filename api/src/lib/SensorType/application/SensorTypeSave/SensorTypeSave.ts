import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { SensorTypeRepository } from '../../domain/SensorTypeRepository';
import {
  SensorTypeCreate,
  SensorTypeEdit,
} from '../../domain/SensorTypeInterfaces';
import { SensorTypeType } from '../../domain/SensorTypeType';
import { SensorTypeId } from '../../domain/SensorTypeId';
import { SensorTypeNotFoundError } from '../../domain/SensorTypeNotFoundError';

export class SensorTypeSave {
  constructor(private readonly repository: SensorTypeRepository) {}

  async run(id: string, type: string): Promise<void> {
    if (!id) {
      if (!type) throw new MissingFieldError('Type');

      const dateCreate: SensorTypeCreate = {
        type: new SensorTypeType(type),
      };
      this.repository.save(dateCreate);
      return;
    }

    const sensortType = await this.repository.findById(new SensorTypeId(id));
    if (!sensortType) throw new SensorTypeNotFoundError(id);

    const dataEdit: SensorTypeEdit = {
      id: new SensorTypeId(id),
      ...(type && { type: new SensorTypeType(type) }),
    };

    this.repository.save(dataEdit);
  }
}
