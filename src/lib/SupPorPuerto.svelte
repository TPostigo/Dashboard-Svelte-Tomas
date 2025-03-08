<script>
  import { scaleLinear } from 'd3';
  import { dataBySurvivingByEmbarked, dataBySurvivingBySex, filters } from '../stores_titanic';
  import { flip } from "svelte/animate";

  let width, height = 600;
  let xScale, yScale;

  const colors = {
    "male": '#3498db',  // Azul para hombres
    "female": '#ff69b4' // Rosa para mujeres
  };

  $: maxCount = $dataBySurvivingByEmbarked.total;
  $: console.log("dataBySurvivingByEmbarked: ", $dataBySurvivingByEmbarked);

  // Filtrar datos de puertos usando la información de supervivientes por género
  $: filteredData = $dataBySurvivingByEmbarked.data.map(d => {
    const maleCount = $filters.male ? ($dataBySurvivingBySex.data.find(s => s.Sex === "male")?.count || 0) : 0;
    const femaleCount = $filters.female ? ($dataBySurvivingBySex.data.find(s => s.Sex === "female")?.count || 0) : 0;
    return {
      Puerto: d.Puerto,
      count: maleCount + femaleCount,
      color: $filters.male && $filters.female ? '#95a5a6' : $filters.male ? colors.male : colors.female
    };
  });

  function barHeight(count) {
    return (count / maxCount) * 100 + "%";
  }
</script>

<main>
  <h2>Supervivientes por Puerto</h2>

  {#if filteredData.length > 0}
    <div class="chart">
      {#each filteredData as { Puerto, count, color } (Puerto)}
        <div animate:flip class="bar-container">
          <div class="bar {Puerto}" style="height: {barHeight(count)}; background-color: {color}; width: 100%;">
            <span class="label">{count}</span>
          </div>
          <p class="category">{Puerto}</p>
        </div>
      {/each}
    </div>
  {:else}
    <p class="no-data">No hay datos disponibles para los filtros seleccionados.</p>
  {/if}
</main>

<style>
  main {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    padding: 20px;
   
    color: #2c3e50;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #34495e;
  }

  .chart {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 300px;
    width: 85%;
    padding: 20px;
    gap: 20px;
    background: white;
    border-radius: 12px;
    border: 3px solid #006D1F;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    height: 80%;
  }

  .bar {
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transition: height 0.3s ease-in-out;
    min-height: 10px;
  }

  .bar:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  .label {
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .category {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #2c3e50;
  }

  .no-data {
    font-size: 18px;
    color: red;
    font-weight: bold;
  }
</style>
