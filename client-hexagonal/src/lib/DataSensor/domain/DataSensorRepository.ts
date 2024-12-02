import { Repository } from "../../Shared/domain/Repository";
import { DataSensor, DataSensorFind } from "./DataSensor";


export interface DataSensorRepository extends Repository<DataSensor> {
  find(sensorDataFind?: DataSensorFind): Promise<DataSensor[]>;
}
