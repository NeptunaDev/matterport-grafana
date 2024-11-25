import { useState, useEffect } from "react";
import type { SDKInstance } from '../types/matterport';

const useSDKConnection = (iframeId: string) => {
  const [sdk, setSdk] = useState<SDKInstance | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const connectSdk = async (): Promise<void> => {
      try {
        while (!window.MP_SDK?.connect) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
        if (!iframe) {
          throw new Error("Iframe not found");
        }

        const mpSdk = await window.MP_SDK.connect(iframe);
        setSdk(mpSdk);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    connectSdk();
  }, [iframeId]);

  return { sdk, error, isLoading };
};

export default useSDKConnection;