import { Device, DeviceFind } from "../domain/Device";
import { DeviceRepository } from "../domain/DeviceRepository";

export const createDeviceService = (deviceRepository: DeviceRepository) => ({
  find: async (deviceFind?: DeviceFind) =>
    await deviceRepository.find(deviceFind),
  save: async (device: Device) => await deviceRepository.save(device),
  remove: async (id: string) => await deviceRepository.remove(id),
});
