import { BaseDate } from './BaseDate';
import { BaseId } from './BaseId';

export class BaseClass {
  id: BaseId;
  createdAt: BaseDate;
  updatedAt: BaseDate;
  deletedAt: BaseDate | null;

  constructor(
    id: BaseId,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
