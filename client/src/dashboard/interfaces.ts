export interface MattertagDescriptor {
    label: string;
    description: string;
    anchorPosition: {
      x: number;
      y: number;
      z: number;
    };
    stemVector: {
      x: number;
      y: number;
      z: number;
    };
  }
  
  export interface Props {
    modelId: string;
    applicationKey: string;
  }

  export interface Plant {
    id: string;
    name: string;
    matterportSid: string;
    createdAt: string;
    updatedAt: string;
  }