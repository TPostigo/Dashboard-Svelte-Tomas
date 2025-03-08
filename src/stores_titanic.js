// @ts-nocheck
import { readable, derived, writable } from 'svelte/store';
import { csv, autoType, extent } from 'd3';

const dataPath = '/data/Titanic-Dataset.csv';

export const dataTitanic = readable([], set => { 
  csv(dataPath, autoType).then(d => set(d));
});

// Definición de filtros activos
export const filters = writable({
  male: true,
  female: true
});

// Datos para barChart por género
export const dataBySurvivingBySex = derived([dataTitanic, filters], ([$dataTitanic, $filters]) => {
  const survivors = $dataTitanic.filter(d => 
    d.Survived === 1 && d.Age !== null && $filters[d.Sex]
  );
  
  const grouped = survivors.reduce((acc, d) => {
    if (!acc[d.Sex]) acc[d.Sex] = { count: 0 };
    acc[d.Sex].count++;
    return acc;
  }, {});

  const processedData = Object.entries(grouped).map(([Sex, values]) => ({
    Sex,
    count: values.count
  }));

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});

// Datos para barChart por víctimas por género
export const dataByVictimsBySex = derived(dataTitanic, $dataTitanic => {
  const victims = $dataTitanic.filter(d => d.Survived === 0);
  
  const grouped = victims.reduce((acc, d) => {
    if (!acc[d.Sex]) acc[d.Sex] = { count: 0 };
    acc[d.Sex].count++;
    return acc;
  }, {});

  const processedData = Object.entries(grouped).map(([Sex, values]) => ({
    Sex,
    count: values.count
  }));

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});

// Datos para barChart por puerto de embarque
export const dataBySurvivingByEmbarked = derived(dataTitanic, $dataTitanic => {
  const survivors = $dataTitanic.filter(d => d.Survived === 1 && d.Embarked !== null);
  
  const grouped = survivors.reduce((acc, d) => {
    if (!acc[d.Embarked]) acc[d.Embarked] = { count: 0 };
    acc[d.Embarked].count++;
    return acc;
  }, {});

  const processedData = Object.entries(grouped)
    .filter(([Puerto]) => Puerto !== "null" && Puerto !== "") // Eliminar valores nulos o vacíos
    .map(([Puerto, values]) => ({
      Puerto,
      count: values.count
    }));

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});

// Rango de edades (para escalas en gráficos)
export const ageExtent = derived(dataTitanic, $dataTitanic => 
  extent($dataTitanic.map(d => d.Age).filter(age => age !== null))
);
