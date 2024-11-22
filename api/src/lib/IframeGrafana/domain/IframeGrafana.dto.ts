export class IframeGrafanaCreateDto {
  readonly idPlant: string;
  readonly url: string;
  readonly order: number;

  constructor(data: { idPlant: string; url: string; order: number }) {
    this.idPlant = data.idPlant;
    this.url = data.url;
    this.order = data.order;
  }
}

export class IframeGrafanaUpdateDto {
  readonly id: string;
  readonly idPlant?: string;
  readonly url?: string;
  readonly order?: number;

  constructor(data: {
    id: string;
    idPlant?: string;
    url?: string;
    order?: number;
  }) {
    this.id = data.id;
    this.idPlant = data.idPlant;
    this.url = data.url;
    this.order = data.order;
  }
}

export class IframeGrafanaFindDto {
  readonly id?: string;
  readonly idPlant?: string;
  readonly url?: string;
  readonly order?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;

  constructor(data: {
    id?: string;
    idPlant?: string;
    url?: string;
    order?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }) {
    this.id = data.id;
    this.idPlant = data.idPlant;
    this.url = data.url;
    this.order = data.order;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}
