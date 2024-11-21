import { DeviceId } from '../../domain/DeviceId';
import { DeviceNotFoundError } from '../../domain/DeviceNotFoundError';
import { DeviceRepository } from '../../domain/DeviceRepository';

export class DeviceRemove {
  constructor(private readonly repository: DeviceRepository) {}

  async run(id: string): Promise<void> {
    const device = await this.repository.findById(new DeviceId(id));
    if (!device) throw new DeviceNotFoundError(id);
    return this.repository.remove(new DeviceId(id));
  }
}
