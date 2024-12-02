import { Base } from "../../Shared/domain/Base";

export interface DataSensor extends Base {
  readonly idSensor: string;
  readonly variable: string;
  readonly value: number;
  readonly unit: string;
}

export type DataSensorFind = Omit<Partial<DataSensor>, "idSensor"> & {
  sensorId?: string;
  getLatestQuantity?: number;
};
