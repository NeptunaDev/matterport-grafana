import { PlantMatterportSid } from './PlantMatterportSid';
import { PlantName } from './PlantName';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { BaseClass } from 'src/lib/Shared/domain/BaseClass';
import { PlantId } from './PlantId';

export class Plant extends BaseClass<PlantId> {
  matterportSid: PlantMatterportSid;
  name: PlantName;

  constructor(
    id: PlantId,
    matterportSid: PlantMatterportSid,
    name: PlantName,
    createdAt: BaseDate,
    updatedAt: BaseDate,
    deletedAt: BaseDate | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.matterportSid = matterportSid;
    this.name = name;
  }
}
