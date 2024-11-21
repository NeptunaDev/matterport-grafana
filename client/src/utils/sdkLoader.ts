const SDK_URL = 'https://static.matterport.com/showcase-sdk/bootstrap/3.0.0-0-g0517b8d76c/sdk.es6.js';

export const loadMatterportSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if SDK is already loaded
    if (window.MP_SDK) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Matterport SDK'));
    };

    document.head.appendChild(script);
  });
};