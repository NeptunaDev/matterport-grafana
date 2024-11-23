import { useState, useEffect, useRef } from 'react';
import { MattertagDescriptor } from '../../../interfaces';
import { SDKInstance } from '../../../../types/matterport';

export const useMattertag = (sdk: SDKInstance | null) => {
  const [mattertagId, setMattertagId] = useState<string | null>(null);
  const intervalRef = useRef<number>();

  useEffect(() => {
    const initializeMattertag = async () => {
      if (!sdk) return;

      try {
        const modelData = await sdk.Model.getData();
        console.log('Model sid:', modelData.sid);

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