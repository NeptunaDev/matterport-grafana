import { useQuery } from "@tanstack/react-query";
import { createAxiosDeviceRepository } from "../../lib/Device/infrastructure/AxiosDeviceRepository";
import { createDeviceService } from "../../lib/Device/application/DeviceService";
import { useDeviceStore } from "../../hooks/useDeviceStore";
import { useEffect } from "react";
import { usePlantStore } from "../../hooks/usePlantStore";

const repository = createAxiosDeviceRepository();
const service = createDeviceService(repository);

export const useFindDevices = () => {
  const setDevices = useDeviceStore((state) => state.setDevices);
  const plantSelectedId = usePlantStore((state) => state.plantSelected?.id);

  const { data } = useQuery({
    queryKey: ["devices", plantSelectedId],
    queryFn: () =>
      service.find({
        ...(plantSelectedId && { idPlant: plantSelectedId }),
      }),
    enabled: !!plantSelectedId,
  });

  useEffect(() => {
    if (!data) return;

    setDevices([...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
};
