import { Coordinates } from "../../Shared/domain/BaeCoordinates";
import { Base } from "../../Shared/domain/Base";

export interface Device extends Base {
  readonly idPlant: string;
  readonly name: string;
  readonly description: string;
  readonly tag: string;
  readonly place: Coordinates;
  readonly condition: boolean;
}

export type DeviceFind = Partial<Device>;
