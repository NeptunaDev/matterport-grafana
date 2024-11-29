import axios from "axios";
import { createQueryService } from "../../Shared/application/queryService";
import { DataSensorRepository } from "../domain/DataSensorRepository";

const queryService = createQueryService();
export const createAxiosDataSensorRepository = (): DataSensorRepository => ({
  find: async (sensorDataFind) => {
    const queries = queryService.createQueries(sensorDataFind ?? {});
    let url = "/api/data-sensor";
    if (queries) url = `${url}${queries}`;
    const response = await axios.get(url);
    return response.data;
  },
  save: async (sensorData) => {
    if (sensorData.id) {
      await axios.put(`/api/data-sensor/${sensorData.id}`, {
        ...sensorData,
      });
    } else {
      await axios.post(`/api/data-sensor`, {
        ...sensorData,
      });
    }
  },
  remove: async (id) => {
    const response = await axios.delete(
      `/api/data-sensor/${id}`
    );
    return response.data;
  },
});
