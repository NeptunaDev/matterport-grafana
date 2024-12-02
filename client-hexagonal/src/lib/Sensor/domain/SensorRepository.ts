import { Repository } from "../../Shared/domain/Repository";
import { Sensor, SensorFind } from "./Sensor";

export interface SensorRepository extends Repository<Sensor> {
  find(sensorFind?: SensorFind): Promise<Sensor[]>;
}
