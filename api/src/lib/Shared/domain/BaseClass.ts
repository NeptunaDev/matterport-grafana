import { BaseDate } from './BaseDate';
import { BaseId } from './BaseId';

export class BaseClass<T extends BaseId> {
  readonly id: T;
  readonly createdAt: BaseDate;
  readonly updatedAt: BaseDate;
  readonly deletedAt: BaseDate | null;

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
    if (this.updatedAt.value < this.createdAt.value) {
      throw new Error('updatedAt cannot be less than createdAt');
    }

    if (this.deletedAt?.value && this.deletedAt.value < this.updatedAt.value) {
      throw new Error('deletedAt cannot be less than updatedAt');
    }
  }

  public mapToPrimitives() {
    const primitives = {};
    Object.keys(this).forEach((key) => {
      primitives[key] = this[key]?.value
        ? this[key].value
        : this[key]?.mapToPrimitives
          ? this[key].mapToPrimitives()
          : null;
    });
    return primitives;
  }

  public mapToPrimitivesWithoutDeletedAt() {
    const primitives = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'deletedAt') {
        primitives[key] = this[key]?.value
          ? this[key].value
          : this[key]?.mapToPrimitivesWithoutDeletedAt
            ? this[key].mapToPrimitivesWithoutDeletedAt()
            : null;
      }
    });
    return primitives;
  }
}
