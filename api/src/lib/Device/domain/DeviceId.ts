import { BaseId } from 'src/lib/Shared/domain/BaseId';

export class DeviceId extends BaseId {
  constructor(value: string) {
    super(value);
  }
}
