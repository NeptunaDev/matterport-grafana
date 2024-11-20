import { BaseDate } from './BaseDate';
import { BaseId } from './BaseId';

export class BaseClass<T extends BaseId> {
  id: T;
  createdAt: BaseDate;
  updatedAt: BaseDate;
  deletedAt: BaseDate | null;

  constructor(
    id: T,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.ensureDateValidations();
  }

  private ensureDateValidations() {
    if (this.updatedAt.value > this.createdAt.value) {
      throw new Error('updatedAt cannot be greater than createdAt');
    }

    if (this.deletedAt && this.deletedAt.value > this.updatedAt.value) {
      throw new Error('deletedAt cannot be greater than updatedAt');
    }
  }
}
