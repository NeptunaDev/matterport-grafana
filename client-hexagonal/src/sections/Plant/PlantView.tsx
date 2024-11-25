import { useEffect, useState } from "react";
import { createPlantService } from "../../lib/Plant/application/PlantService";
import { createLocalStoragePlantRepository } from "../../lib/Plant/infrastructure/LocalStoragePlantRepository";
import { Plant } from "../../lib/Plant/domain/Plant";

const repository = createLocalStoragePlantRepository();
const services = createPlantService(repository);

export default function PlantView() {
  const [plants, setPlants] = useState<Plant[]>();
  console.log("🚀 ~ PlantView ~ plants:", plants);

  useEffect(() => {
    const fetchPlants = async () => {
      const plants = await services.find();
      setPlants(plants);
    };
    fetchPlants();
  }, []);

  return (
    <div>
      <h1>Task View</h1>
    </div>
  );
}
