import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import useSDKConnection from '../../../hooks/useSdkApp';
import { MattertagDescriptor, Props } from '../../interfaces';
import { loadMatterportSDK } from '../../../utils/sdkLoader';

const IFRAME_ID = 'matterport-showcase';

const MatterportViewer: React.FC<Props> = ({ modelId, applicationKey }) => {
  const [mattertagId, setMattertagId] = useState<string | null>(null);
  const [sdkError, setSdkError] = useState<Error | null>(null);
  console.log("🚀 ~ sdkError:", sdkError)
  const intervalRef = useRef<number>();
  const { sdk, error, isLoading } = useSDKConnection(IFRAME_ID);

  // Load Matterport SDK
  useEffect(() => {
    const initSDK = async () => {
      try {
        await loadMatterportSDK();
      } catch (err) {
        setSdkError(err instanceof Error ? err : new Error('Failed to load SDK'));
        console.error('Failed to load Matterport SDK:', err);
      }
    };

    initSDK();
  }, []);

  // Initialize Mattertag once SDK is connected
  useEffect(() => {
    const initializeMattertag = async () => {
      if (!sdk) return;

      try {
        // Get model data
        const modelData = await sdk.Model.getData();
        console.log('Model sid:', modelData.sid);

        // Fetch initial data and create Mattertag
        const response = await fetch('http://localhost:3032/');
        const data = await response.json();

        const mattertagDesc: MattertagDescriptor = {
          label: 'CO Value',
          description: data.covalue.toString(),
          anchorPosition: { x: -2.5, y: 2, z: 3 },
          stemVector: { x: 0, y: 0, z: 0 },
        };

        const [tagId] = await sdk.Mattertag.add(mattertagDesc);
        setMattertagId(tagId);
      } catch (err) {
        console.error('Failed to initialize Mattertag:', err);
      }
    };

    initializeMattertag();
  }, [sdk]);

  // Update Mattertag data
  useEffect(() => {
    if (!sdk || !mattertagId) return;

    const updateMattertagData = async () => {
      try {
        const response = await fetch('http://localhost:3032/');
        const data = await response.json();
        
        await sdk.Mattertag.editBillboard(mattertagId, {
          label: 'CO Value',
          description: data.covalue.toString(),
        });
        
        console.log('Updated CO value:', data.covalue);
      } catch (err) {
        console.error('Failed to update Mattertag:', err);
      }
    };

    // Initial update
    updateMattertagData();

    intervalRef.current = window.setInterval(updateMattertagData, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [sdk, mattertagId]);

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error connecting to Matterport: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      minHeight: 480,
      position: 'relative' 
    }}>
      {isLoading && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}>
          <CircularProgress />
        </Box>
      )}
      <iframe
        id={IFRAME_ID}
        src={`https://my.matterport.com/show?m=${modelId}&play=1&applicationKey=${applicationKey}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="fullscreen *"
        style={{ 
          display: 'block',
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s'
        }}
      />
    </Box>
  );
};

export default MatterportViewer;