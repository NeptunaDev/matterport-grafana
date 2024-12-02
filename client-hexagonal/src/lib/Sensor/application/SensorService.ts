import { Sensor, SensorFind } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export const createSensorService = (sensorRepository: SensorRepository) => ({
  find: async (sensorFind?: SensorFind) =>
    await sensorRepository.find(sensorFind),
  save: async (sensor: Sensor) => await sensorRepository.save(sensor),
  remove: async (id: string) => await sensorRepository.remove(id),
});
