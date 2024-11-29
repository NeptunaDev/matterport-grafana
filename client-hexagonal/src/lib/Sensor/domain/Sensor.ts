import { Coordinates } from "../../Shared/domain/BaeCoordinates";
import { Base } from "../../Shared/domain/Base";

export interface Sensor extends Base {
  readonly idType: string;
  readonly idDevice: string;
  readonly place: Coordinates;
  readonly vector: Coordinates;
  readonly title: string;
  readonly description: string;
  readonly color: string;
}

export type SensorFind = Partial<Sensor>;

export interface SensorTag extends Sensor {
  matterportId: string;
}