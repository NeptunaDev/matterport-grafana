import { DataSensor, DataSensorFind } from "../domain/DataSensor";
import { DataSensorRepository } from "../domain/DataSensorRepository";

export const createDataSensorService = (repository: DataSensorRepository) => ({
  find: async (sensorDataFind: DataSensorFind) =>
    await repository.find(sensorDataFind),
  save: async (sensorData: DataSensor) => await repository.save(sensorData),
  remove: async (id: string) => await repository.remove(id),
});
