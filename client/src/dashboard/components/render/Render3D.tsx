import React from 'react';
import { Box, Alert } from '@mui/material';
import { Props } from '../../interfaces';
import { useMatterportSdk } from './hooks/UseMatterportSdk';
import { useMattertag } from './hooks/UseMattertag';
import { MatterportIframe } from './components/MatterportIframe';
import { LoadingOverlay } from './components/LoadingOverlay';

const IFRAME_ID = 'matterport-showcase';

const MatterportViewer: React.FC<Props> = ({ modelId, applicationKey }) => {
  const { sdk, error, isLoading } = useMatterportSdk(IFRAME_ID);
  useMattertag(sdk);

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
      {isLoading && <LoadingOverlay />}
      <MatterportIframe
        id={IFRAME_ID}
        modelId={modelId}
        applicationKey={applicationKey}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default MatterportViewer;