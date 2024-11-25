import { ensureBaseIdIsValid } from "../../Shared/domain/Base";
import { ensureBaseNameIsValid } from "../../Shared/domain/BaseNameType";
import { Repository } from "../../Shared/domain/Repository";
import {
  ensurePlantMatterportSidIsValid,
  Plant,
  PlantCreate,
} from "../domain/Plant";

export const createPlantService = (repository: Repository<Plant>) => ({
  find: () => repository.find(),
  save: (plant: PlantCreate) => {
    if (plant.matterportSid)
      ensurePlantMatterportSidIsValid(plant.matterportSid);
    if (plant.name) ensureBaseNameIsValid(plant.name);
    if (plant.id) ensureBaseIdIsValid(plant.id);
    repository.save(plant);
  },
  remove: (id: string) => {
    ensureBaseIdIsValid(id);
    repository.remove(id);
  },
});
