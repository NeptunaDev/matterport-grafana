import { useQuery } from "@tanstack/react-query";
import { createAxiosDeviceRepository } from "../../lib/Device/infrastructure/AxiosDeviceRepository";
import { createDeviceService } from "../../lib/Device/application/DeviceService";
import { usePlantStore } from "../../hooks/usePlantStore";
import { useDeviceStore } from "../../hooks/useDeviceStore";
import { useEffect } from "react";

const repository = createAxiosDeviceRepository();
const service = createDeviceService(repository);
export const useFindDevices = () => {
  const plantSelected = usePlantStore((state) => state.plantSelected);
  const setDevices = useDeviceStore((state) => state.setDevices);

  const { data } = useQuery({
    queryKey: ["devices", plantSelected?.id],
    queryFn: () =>
      service.find({
        ...(plantSelected && { idPlant: plantSelected.id }),
      }),
  });

  useEffect(() => {
    if (!data) return;
    setDevices(data);
  }, [data, setDevices]);
};
