import { Base } from "../../Shared/domain/Base";
import { BaseName } from "../../Shared/domain/BaseNameType";

export interface Plant extends Base {
  readonly matterportSid: string;
  readonly name: BaseName;
}

export type PlantCreate = Partial<Omit<Plant, "createdAt" | "updatedAt">>;

export function matterportSidIsValid(matterportSid: string): boolean {
  const sidPattern = /^[a-zA-Z0-9]{1,12}$/;
  const isValidMatterportSid = sidPattern.test(matterportSid);
  if (!isValidMatterportSid) {
    return false;
  }
  return true;
}

export function ensurePlantMatterportSidIsValid(matterportSid: string): void {
  if (!matterportSidIsValid(matterportSid)) {
    throw new Error(`Invalid MatterportSid: ${matterportSid}`);
  }
}
