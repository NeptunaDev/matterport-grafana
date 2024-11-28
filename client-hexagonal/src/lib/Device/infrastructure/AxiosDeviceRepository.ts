import axios from "axios";
import { createQueryService } from "../../Shared/application/queryService";
import { DeviceRepository } from "../domain/DeviceRepository";
import { Device } from "../domain/Device";

const queryService = createQueryService();
export const createAxiosDeviceRepository = (): DeviceRepository => ({
  find: async (deviceFind) => {
    const queries = queryService.createQueries(deviceFind ?? {});
    let url = "http://localhost:8000/device";
    if (queries) url = `${url}${queries}`;
    const response = await axios.get<Device[]>(url);
    return response.data;
  },
  save: async (device) => {
    if (device.id) {
      await axios.patch(`http://localhost:8000/device/${device.id}`, device);
    } else {
      await axios.post("http://localhost:8000/device", device);
    }
  },
  remove: async (id) => {
    await axios.delete(`http://localhost:8000/device/${id}`);
  },
});
