import { ensureBaseIdIsValid } from "../../Shared/domain/Base";
import { ensureBaseNameIsValid } from "../../Shared/domain/BaseNameType";
import { Repository } from "../../Shared/domain/Repository";
import {
  ensurePlantMatterportSidIsValid,
  Plant,
  PlantSave,
} from "../domain/Plant";

export const createPlantService = (repository: Repository<Plant>) => ({
  find: async () => await repository.find(),
  save: async (plant: PlantSave) => {
    if (plant.matterportSid)
      ensurePlantMatterportSidIsValid(plant.matterportSid);
    if (plant.name) ensureBaseNameIsValid(plant.name);
    if (plant.id) ensureBaseIdIsValid(plant.id);
    await repository.save(plant);
  },
  remove: async (id: string) => {
    ensureBaseIdIsValid(id);
    await repository.remove(id);
  },
});
