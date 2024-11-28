import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { createPlantService } from "../../lib/Plant/application/PlantService";
import { Plant, PlantSave } from "../../lib/Plant/domain/Plant";
import { createAxiosPlantRepository } from "../../lib/Plant/infrastructure/AxiosPlantRepository";
import { AxiosError } from "axios";

const repository = createAxiosPlantRepository();
const services = createPlantService(repository);
const initialPlantSave: PlantSave = {
  id: undefined,
  matterportSid: "",
  name: "",
};

export default function PlantView() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantSave, setPlantSave] = useState<PlantSave>({
    ...initialPlantSave,
  });
  const [error, setError] = useState<string | undefined>(undefined);

  const handleEdit = (plant: Plant) =>
    setPlantSave({
      id: plant.id,
      matterportSid: plant.matterportSid,
      name: plant.name,
    });

  const cleanPlantSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPlantSave({ ...initialPlantSave });
  };

  const handlePlantSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlantSave((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete =  async (id: string) => {
    await services.remove(id);
    await fetchPlants();
  };

  const submit: FormEventHandler = async (e) => {
    try {
      e.preventDefault();
      await services.save(plantSave);
      setPlantSave({ ...initialPlantSave });
      fetchPlants();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const fetchPlants = async () => {
    const plants = await services.find();
    setPlants(plants);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div>
      <h1>Plants</h1>
      {plants.length === 0 && <p>No plants found</p>}
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            {plant.name} - {plant.matterportSid}
            <button onClick={() => handleEdit(plant)}>✏ Edit</button>
            <button onClick={() => handleDelete(plant.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={submit}>
        {plantSave.id && (
          <input
            type="text"
            name="id"
            id="id"
            onChange={handlePlantSaveChange}
            value={plantSave.id}
            placeholder="Id"
            readOnly
          />
        )}
        <input
          type="text"
          name="name"
          id="name"
          onChange={handlePlantSaveChange}
          value={plantSave.name}
          placeholder="Name"
        />
        <input
          type="text"
          name="matterportSid"
          id="matterportSid"
          onChange={handlePlantSaveChange}
          value={plantSave.matterportSid}
          placeholder="Matterport Sid"
        />
        <button type="submit">💾 Save</button>
        <button onClick={cleanPlantSave}>🧹 Clean</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
