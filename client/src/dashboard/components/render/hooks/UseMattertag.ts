import { useState, useEffect, useRef } from "react";
import {
  Device,
  MattertagDescriptor,
  Plant,
  Sensor,
} from "../../../interfaces";
import { SDKInstance } from "../../../../types/matterport";

export const useMattertag = (sdk: SDKInstance | null) => {
  const [mattertagIds, setMattertagIds] = useState<string[]>([]);
  const intervalRef = useRef<number>();
  const [, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string>("");
  const [, setDevice] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDevicetId] = useState<string>("");
  const [sensors, setSensors] = useState<Sensor[]>([]);
  console.log("🚀 ~ useMattertag ~ sensors:", sensors);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:8000/plant");
        const data: Plant[] = await response.json();
        setPlants(data);

        if (data.length > 0) {
          setSelectedPlantId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/device?createAt=${selectedPlantId}`
        );
        const data: Device[] = await response.json();
        setDevice(data);

        if (data.length > 0) {
          setSelectedDevicetId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, [selectedPlantId]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/sensor?idDevice=${selectedDeviceId}`
        );
        const data: Sensor[] = await response.json();
        setSensors(data);
      } catch (error) {
        console.error("Error fetching sensors:", error);
      }
    };

    fetchSensors();
  }, [selectedDeviceId]);

  useEffect(() => {
    const initializeMattertags = async () => {
      if (!sdk || sensors.length === 0) return;
      try {
        // Remove existing Mattertags before creating new ones
        if (mattertagIds.length > 0) {
          await sdk.Mattertag.remove(mattertagIds);
          setMattertagIds([]);
        }

        // Create and add Mattertags one by one
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

        console.log("🚀 ~ initializeMattertags ~ newTagIds:", newTagIds);
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
        // Only update Mattertags that have corresponding sensor data
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
