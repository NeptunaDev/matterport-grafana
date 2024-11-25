import { useState, useEffect } from 'react';
import { loadMatterportSDK } from '../../../../utils/sdkLoader';
import useSDKConnection from '../../../../hooks/useSdkApp';

export const useMatterportSdk = (iframeId: string) => {
  const [sdkError, setSdkError] = useState<Error | null>(null);
  const { sdk, error, isLoading } = useSDKConnection(iframeId);

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

  return { sdk, error: error || sdkError, isLoading };
};