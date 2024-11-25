import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlant, setPlantSelected } from "../features/counter/plantSlice";

interface Plant {
  id: string;
  name: string;
  matterportSid: string;
  createdAt: string;
  updatedAt: string;
}

export const usePlantManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:8000/plant");
        const data: Plant[] = await response.json();
        dispatch(setPlant(data));
        dispatch(setPlantSelected(data[0]));
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, [dispatch]);
};
