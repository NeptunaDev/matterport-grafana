export class PlantMatterportSidExisting extends Error {
  constructor(matterportSid?: string) {
    const message = matterportSid
      ? `Plant with MatterportSid ${matterportSid} already exists`
      : 'Plant with MatterportSid already exists';
    super(message);
    this.name = 'PlantMatterportSidExisting';
  }
}
