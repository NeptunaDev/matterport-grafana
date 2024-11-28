import { SensorData, SensorDataFind } from "../domain/SensorData";
import { SensorDataRepository } from "../domain/SensorDataRepository";

export const createSensorDataService = (repository: SensorDataRepository) => ({
  find: async (sensorDataFind: SensorDataFind) =>
    await repository.find(sensorDataFind),
  save: async (sensorData: SensorData) => await repository.save(sensorData),
  remove: async (id: string) => await repository.remove(id),
});
