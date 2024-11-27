import { useState, useEffect, useRef } from "react";
import { Device, MattertagDescriptor, Sensor } from "../../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

export const useMattertag = () => {
  const [mattertagIds, setMattertagIds] = useState<string[]>([]);
  const intervalRef = useRef<number>();
  const [device, setDevice] = useState<Device[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  // console.log("🚀 ~ useMattertag ~ sensors:", sensors)
  const { plantSelected } = useSelector((state: RootState) => state.plant);
  const { sdk } = useSelector((state: RootState) => state.sdk);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(
          `/api/device?idPlant=${plantSelected?.id}`
        );
        const data: Device[] = await response.json();
        setDevice(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, [plantSelected]);

  const findSensor = async (device: Device) => {
    const response = await fetch(
      `/api/sensor?idDevice=${device.id}`
    );
    const data = await response.json();
    setSensors((prev) => {
      const news: Sensor[] = [];
      data.forEach((da: Sensor) => {
        const exist = prev.find((se) => se.id === da.id);
        if (!exist) {
          news.push(da);
        }
      });
      return [...prev, ...news];
    });
  };

  useEffect(() => {
    setSensors([]);
    const fetchSensors = async () => {
      try {
        device.forEach((devi) => findSensor(devi));
      } catch (error) {
        console.error("Error fetching sensors:", error);
      }
    };

    fetchSensors();
  }, [device]);

  useEffect(() => {
    const initializeMattertags = async () => {
      if (!sdk || sensors.length === 0) return;
      try {
        if (mattertagIds.length > 0) {
          await sdk.Mattertag.remove(mattertagIds);
          setMattertagIds([]);
        }
        const newTagIds = [];
        for (const sensor of sensors) {
          const mattertagDescriptor: MattertagDescriptor = {
            label: sensor.title,
            description: sensor.description,
            anchorPosition: {
              x: sensor.place[0],
              y: sensor.place[1],
              z: sensor.place[2],
            },
            stemVector: {
              x: sensor.vector[0],
              y: sensor.vector[1],
              z: sensor.vector[2],
            },
          };

          const [tagId] = await sdk.Mattertag.add(mattertagDescriptor);
          newTagIds.push(tagId);
        }
        setMattertagIds(newTagIds);
      } catch (err) {
        console.error("Failed to initialize Mattertags:", err);
      }
    };

    initializeMattertags();
  }, [sdk, sensors]);

  useEffect(() => {
    if (!sdk || mattertagIds.length === 0 || sensors.length === 0) return;

    const updateMattertagsData = async () => {
      try {
        const updates = mattertagIds.map(async (tagId, index) => {
          const sensor = sensors[index];
          if (!sensor) {
            console.warn(
              `No sensor data found for Mattertag at index ${index}`
            );
            return;
          }

          await sdk.Mattertag.editBillboard(tagId, {
            label: sensor.title,
            description: `${
              sensor.description
            }\nLast updated: ${new Date().toLocaleTimeString()}`,
          });
        });

        await Promise.all(updates);
      } catch (err) {
        console.error("Failed to update Mattertags:", err);
      }
    };

    updateMattertagsData();
    intervalRef.current = window.setInterval(updateMattertagsData, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [sdk, mattertagIds, sensors]);

  return { mattertagIds };
};
