import { useEffect, useRef } from 'react';

interface MatterportViewerProps {
  modelSid: string;
  sdkKey: string;
}

declare global {
  interface Window {
    MP_SDK: {
      connect: (frame: Window) => Promise<unknown>;
    }
  }
}


export const MatterportIframe = ({ modelSid, sdkKey }: MatterportViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const showcase = iframeRef.current;
    if (!showcase) return;

    const showcaseWindow = showcase.contentWindow;
    showcase.addEventListener('load', async function() {
      try {
        const mpSdk = await showcaseWindow?.MP_SDK.connect(showcaseWindow);
        console.log('SDK Connected', mpSdk);
      } catch(e) {
        console.error(e);
      }
    });
  }, []);

  return (
    <iframe 
      ref={iframeRef}
      width="740" 
      height="480" 
      src={`/lib/showcase-bundle/showcase.html?m=${modelSid}&applicationKey=${sdkKey}`}
      frameBorder="0" 
      allowFullScreen 
      allow="vr" 
    />
  );
};