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

export interface Device {
  id: string;
  createdAt: string;
  updatedAt: string;
  idPlant: string;
  name: string;
  description: string;
  tag: string;
  place: [number, number, number];
  condition: boolean;
}

export interface Sensor {
  value: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  idDevice: string;
  idType: string,
  name: string;
  description: string;
  place: [number, number, number];
  vector: [number, number, number];
  title: string;
  color: string;
}
