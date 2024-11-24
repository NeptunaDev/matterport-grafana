import { useState, useEffect, useRef } from 'react';
import { Device, MattertagDescriptor, Plant, Sensor } from '../../../interfaces';
import { SDKInstance } from '../../../../types/matterport';

export const useMattertag = (sdk: SDKInstance | null) => {
  const [mattertagId, setMattertagId] = useState<string | null>(null);
  const intervalRef = useRef<number>();
  const [, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string>('');
  const [, setDevice] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDevicetId] = useState<string>('');
  const [sensor, setSensor] = useState<Sensor[]>([])
  console.log("🚀 ~ useMattertag ~ sensor:", sensor)
 
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:8000/plant');
        const data: Plant[] = await response.json();
        setPlants(data);
        
        if (data.length > 0) {
          setSelectedPlantId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    
    fetchPlants();
  }, []);

 useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`http://localhost:8000/device?createAt=${selectedPlantId}`);
        const data: Device[] = await response.json();
        setDevice(data)

        if (data.length > 0) {
          setSelectedDevicetId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
   
    fetchDevices();
   }, [selectedPlantId]);

 useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await fetch(`http://localhost:8000/sensor?idDevice=${selectedDeviceId}`);
        const data: Sensor[] = await response.json();
        setSensor(data)

        if (data.length > 0) {
          setSelectedDevicetId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
   
    fetchSensors();
   }, [selectedDeviceId]);

  useEffect(() => {
    const initializeMattertag = async () => {
      if (!sdk) return;

      try {
        const modelData = await sdk.Model.getData();
        console.log("🚀 ~ initializeMattertag ~ modelData:", modelData)

        const mattertagDesc: MattertagDescriptor = {
          label: 'CO Value',
          description: Math.random().toString(),
          anchorPosition: { x: -2.5, y: 2, z: 3 },
          stemVector: { x: 1, y: 1, z: 1 },
        };

        const [tagId] = await sdk.Mattertag.add(mattertagDesc);
        setMattertagId(tagId);
      } catch (err) {
        console.error('Failed to initialize Mattertag:', err);
      }
    };

    initializeMattertag();
  }, [sdk]);

  useEffect(() => {
    if (!sdk || !mattertagId) return;

    const updateMattertagData = async () => {
      try {
        await sdk.Mattertag.editBillboard(mattertagId, {
          label: 'CO Value',
          description: Math.random().toString(),
        });
      } catch (err) {
        console.error('Failed to update Mattertag:', err);
      }
    };

    updateMattertagData();
    intervalRef.current = window.setInterval(updateMattertagData, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [sdk, mattertagId]);

  return { mattertagId };
};