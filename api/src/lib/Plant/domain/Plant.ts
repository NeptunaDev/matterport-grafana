import { BaseId } from 'src/lib/Shared/domain/BaseId';
import { MatterportSid } from './PlantMatterportSid';
import { PlantName } from './PlantName';
import { BaseDate } from 'src/lib/Shared/domain/BaseDate';
import { BaseClass } from 'src/lib/Shared/domain/BaseClass';

export class Plant extends BaseClass {
  matterportSid: MatterportSid;
  name: PlantName;

  constructor(
    id: BaseId,
    matterportSid: MatterportSid,
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
