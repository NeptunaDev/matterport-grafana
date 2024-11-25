import React from 'react';

interface MatterportIframeProps {
  id: string;
  modelId: string;
  applicationKey: string;
  isLoading: boolean;
}

export const MatterportIframe: React.FC<MatterportIframeProps> = ({
  id,
  modelId,
  applicationKey,
  isLoading,
}) => (
  <iframe
    id={id}
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
);