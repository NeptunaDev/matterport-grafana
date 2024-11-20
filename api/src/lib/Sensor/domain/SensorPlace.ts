import { BasePlace } from 'src/lib/Shared/domain/BasePlace';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';

export class SensorPlace extends BasePlace {
  constructor(value: Coordinates) {
    super(value);
  }
}