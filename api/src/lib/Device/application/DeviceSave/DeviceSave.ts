import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { DeviceRepository } from '../../domain/DeviceRepository';
import { PlantRepository } from 'src/lib/Plant/domain/PlantRepository';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { PlantId } from 'src/lib/Plant/domain/PlantId';
import { PlantNotFoundError } from 'src/lib/Plant/domain/PlantNotFoundError';
import { DeviceCreate, DeviceEdit } from '../../domain/DeviceInterfaces';
import { DeviceName } from '../../domain/DeviceName';
import { DeviceDescription } from '../../domain/DeviceDescription';
import { DeviceTag } from '../../domain/DeviceTag';
import { DevicePlace } from '../../domain/DevicePlace';
import { DeviceCondition } from '../../domain/DeviceCondition';
import { DeviceId } from '../../domain/DeviceId';
import { DeviceNotFoundError } from '../../domain/DeviceNotFoundError';

export class DeviceSave {
  constructor(
    private readonly repository: DeviceRepository,
    private readonly plantRepository: PlantRepository,
  ) {}

  private async checkPlant(idPlant: string): Promise<void> {
    const plant = await this.plantRepository.findById(new PlantId(idPlant));
    if (!plant) throw new PlantNotFoundError(idPlant);
  }

  async run(
    id: string,
    idPlant?: string,
    name?: string,
    description?: string,
    tag?: string,
    place?: Coordinates,
    condition?: boolean,
  ): Promise<void> {
    if (!id) {
      if (!idPlant) throw new MissingFieldError('PlantId');
      if (!name) throw new MissingFieldError('Name');
      if (!description) throw new MissingFieldError('Description');
      if (!tag) throw new MissingFieldError('Tag');
      if (!place) throw new MissingFieldError('Place');
      if (condition === undefined) throw new MissingFieldError('Condition');

      await this.checkPlant(idPlant);
      const dateCreate: DeviceCreate = {
        idPlant: new PlantId(idPlant),
        name: new DeviceName(name),
        description: new DeviceDescription(description),
        tag: new DeviceTag(tag),
        place: new DevicePlace(place),
        condition: new DeviceCondition(condition),
      };
      return this.repository.save(dateCreate);
    }
    const device = await this.repository.findById(new DeviceId(id));
    if (!device) throw new DeviceNotFoundError(id);

    if (idPlant && device.idPlant.value !== idPlant)
      await this.checkPlant(idPlant);

    const dateEdit: DeviceEdit = {
      id: new DeviceId(id),
      ...(idPlant && { idPlant: new PlantId(idPlant) }),
      ...(name && { name: new DeviceName(name) }),
      ...(description && { description: new DeviceDescription(description) }),
      ...(tag && { tag: new DeviceTag(tag) }),
      ...(place && { place: new DevicePlace(place) }),
      ...(condition !== undefined && {
        condition: new DeviceCondition(condition),
      }),
    };

    return this.repository.save(dateEdit);
  }
}
