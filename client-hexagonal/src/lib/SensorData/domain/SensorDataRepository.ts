import { Repository } from "../../Shared/domain/Repository";
import { SensorData, SensorDataFind } from "./SensorData";

export interface SensorDataRepository extends Repository<SensorData> {
  find(sensorDataFind?: SensorDataFind): Promise<SensorData[]>;
}
