import axios from "axios";
import { Repository } from "../../Shared/domain/Repository";
import { Plant } from "../domain/Plant";

export const createAxiosPlantRepository = (): Repository<Plant> => ({
  find: async (): Promise<Plant[]> => {
    const response = await axios.get<Plant[]>("http://localhost:8000/plant");
    return response.data;
  },
  save: async (plant): Promise<void> => {
    if (plant.id) {
      await axios.patch(`http://localhost:8000/plant/${plant.id}`, plant);
    } else {
      await axios.post("http://localhost:8000/plant", plant);
    }
  },
  remove: async (id): Promise<void> => {
    await axios.delete(`http://localhost:8000/plant/${id}`);
  },
});