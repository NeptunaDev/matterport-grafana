import { Repository } from "../../Shared/domain/Repository";
import { Plant } from "../domain/Plant";

export const createLocalStoragePlantRepository = (): Repository<Plant> => ({
  find: (): Promise<Plant[]> => {
    const plants = localStorage.getItem("plants");
    const parsedPlants: Plant[] = plants ? JSON.parse(plants) : [];
    return Promise.resolve(parsedPlants);
  },
  save: (plant): Promise<void> => {
    const plants = localStorage.getItem("plants");
    const parsedPlants: Plant[] = plants ? JSON.parse(plants) : [];
    if (plant.id) {
      const index = parsedPlants.findIndex((p) => p.id === plant.id);
      if (index !== -1) {
        parsedPlants[index] = {
          ...parsedPlants[index],
          ...plant,
          updatedAt: new Date(),
        };
      }
    } else {
      if (!plant.matterportSid) throw new Error("MatterportSid is required");
      if (!plant.name) throw new Error("Name is required");
      parsedPlants.push({
        id: new Date().getTime().toString(),
        matterportSid: plant.matterportSid ?? "",
        name: plant.name ?? "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    localStorage.setItem("plants", JSON.stringify(parsedPlants));
    return Promise.resolve();
  },
  remove: (id): Promise<void> => {
    const plants = localStorage.getItem("plants");
    const parsedPlants: Plant[] = plants ? JSON.parse(plants) : [];
    localStorage.setItem(
      "plants",
      JSON.stringify(parsedPlants.filter((p) => p.id !== id))
    );
    return Promise.resolve();
  },
});
