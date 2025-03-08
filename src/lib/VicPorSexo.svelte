<script>
    import { scaleLinear } from 'd3';
    import { dataByVictimsBySex, filters } from '../stores_titanic';
    import { flip } from "svelte/animate";
  
    let width, height = 600;
    let xScale, yScale;
  
    const colors = {
      "male": '#e74c3c',  // Rojo para hombres (víctimas)
      "female": '#f39c12' // Amarillo para mujeres (víctimas)
    };
  
    $: maxCount = $dataByVictimsBySex.total;
    $: console.log("dataByVictimsBySex: ", $dataByVictimsBySex);
  
    // Aplicar filtros para mostrar solo los datos seleccionados
    $: filteredData = $dataByVictimsBySex.data.filter(d => $filters[d.Sex]);
  
    function barHeight(count) {
      return (count / maxCount) * 100 + "%";
    }
  </script>
  
  <main>
    <h2>Víctimas por Género</h2>
  
    {#if filteredData.length > 0}
      <div class="chart">
        {#each filteredData as { Sex, count } (Sex)}
          <div animate:flip class="bar-container">
            <div class="bar {Sex}" style="height: {barHeight(count)}; background-color: {colors[Sex]}; width: 100%;">
              <span class="label">{count}</span>
            </div>
            <p class="category">{Sex}</p>
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
      border: 3px solid #006D1F;
      justify-content: center;
      align-items: flex-end;
      height: 300px;
      padding: 20px;
      gap: 20px;
      background: white;
      border-radius: 12px;
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
  