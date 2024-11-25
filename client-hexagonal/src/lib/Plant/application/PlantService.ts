import { Repository } from "../../Shared/domain/Repository";
import { Plant } from "../domain/Plant";

export const createPlantService = (repository: Repository<Plant>) => ({
  find: () => repository.find(),
  save: (plant: Plant) => repository.save(plant),
  remove: (id: string) => repository.remove(id),
})