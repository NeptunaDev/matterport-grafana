export interface Vector3 {
    x: number;
    y: number;
    z: number;
  }
  
  // Type for Mattertag descriptor
  export interface MattertagDescriptor {
    label: string;
    description: string;
    anchorPosition: Vector3;
    stemVector: Vector3;
  }
  
  // Type for Model data
  export interface ModelData {
    sid: string;
  }
  
  // SDK Interfaces
  export interface MattertagAPI {
    remove(mattertagId: string[]): unknown;
    add: (descriptor: MattertagDescriptor) => Promise<string[]>;
    editBillboard: (
      mattertagId: string, 
      properties: { 
        label: string; 
        description: string;
      }
    ) => Promise<void>;
    // Add other Mattertag methods if needed
  }
  
  export interface ModelAPI {
    getData: () => Promise<ModelData>;
    // Add other Model methods if needed
  }
  
  export interface SDKInstance {
    Mattertag: MattertagAPI;
    Model: ModelAPI;
  }
  
  export interface MatterportSDK {
    connect: (iframe: HTMLIFrameElement) => Promise<SDKInstance>;
  }