import { useState, useEffect } from 'react';

interface Plant {
 id: string;
 name: string;
 matterportSid: string;
 createdAt: string;
 updatedAt: string;
}

export const usePlantManager = () => {
 const [plants, setPlants] = useState<Plant[]>([]);
 const [selectedPlant, setSelectedPlant] = useState<string>('');

 const fetchPlants = async () => {
   try {
     const response = await fetch('http://localhost:8000/plant');
     const data: Plant[] = await response.json();
     setPlants(data);
   } catch (error) {
     console.error('Error fetching plants:', error);
   }
 };

 useEffect(() => {
   fetchPlants();
 }, []);

 return {
   plants,
   selectedPlant,
   setSelectedPlant,
   fetchPlants
 };
};