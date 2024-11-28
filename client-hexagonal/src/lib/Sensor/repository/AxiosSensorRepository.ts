import axios from "axios";
import { createQueryService } from "../../Shared/application/queryService";
import { SensorRepository } from "../domain/SensorRepository";
import { Sensor } from "../domain/Sensor";

const queryService = createQueryService();
export const createAxiosSensorRepository = (): SensorRepository => ({
  find: async (sensorFind) => {
    const queries = queryService.createQueries(sensorFind ?? {});
    let url = "http://localhost:8000/sensor";
    if (queries) url = `${url}${queries}`;
    const response = await axios.get<Sensor[]>(url);
    return response.data;
  },
  save: async (sensor) => {
    if (sensor.id) {
      await axios.patch(`http://localhost:8000/sensor/${sensor.id}`, sensor);
    } else {
      await axios.post("http://localhost:8000/sensor", sensor);
    }
  },
  remove: async (id) => {
    await axios.delete(`http://localhost:8000/sensor/${id}`);
  },
});
