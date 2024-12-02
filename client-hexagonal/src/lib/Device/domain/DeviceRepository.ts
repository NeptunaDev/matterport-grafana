import { Repository } from "../../Shared/domain/Repository";
import { Device, DeviceFind } from "./Device";

export interface DeviceRepository extends Repository<Device> {
  find(deviceFind?: DeviceFind): Promise<Device[]>;
}