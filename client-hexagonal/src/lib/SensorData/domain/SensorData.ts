import { Base } from "../../Shared/domain/Base";

export interface SensorData extends Base {
  readonly idSensor: string;
  readonly variable: string;
  readonly value: number;
  readonly unit: string;
}

export type SensorDataFind = Partial<SensorData>;