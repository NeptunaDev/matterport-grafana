import type { MatterportSDK } from './matterport';

declare global {
  interface Window {
    MP_SDK: MatterportSDK;
  }
}

export {};