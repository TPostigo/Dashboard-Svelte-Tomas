<script>
  // @ts-ignore
  import { pie, arc } from 'd3-shape';
  import { dataBySurvivingBySex, filters } from '../stores_titanic';

  let width = 200, height = 200;
  let radius = Math.min(width, height) / 2;

  const colors = {
    "male": '#3498db',  // Azul para hombres
    "female": '#ff69b4' // Rosa para mujeres
  };

  // Filtrar datos según selección en los filtros
  $: filteredData = $dataBySurvivingBySex.data.filter(d => $filters[d.Sex]);

  // Crear la estructura del gráfico de pastel
  const pieGenerator = pie().value(d => d.count);
  // @ts-ignore
  const arcGenerator = arc().innerRadius(0).outerRadius(radius);
</script>

<main>
  <h2>Supervivientes por Género</h2>
<div class="queso">
  {#if filteredData.length > 0}
    <svg width={width} height={height} viewBox="0 0 {width} {height}">
      <g transform="translate({width / 2}, {height / 2})">
        {#each pieGenerator(filteredData) as slice (slice.data.Sex)}
          <path 
            d={arcGenerator(slice)} 
            fill={colors[slice.data.Sex]} 
            stroke="white" 
            stroke-width="2">
          </path>
          <text 
            x={arcGenerator.centroid(slice)[0]} 
            y={arcGenerator.centroid(slice)[1]} 
            text-anchor="middle" 
            fill="white"
            font-size="16px"
            font-weight="bold">
            {slice.data.count}
          </text>
        {/each}
      </g>
    </svg>
  {:else}
    <p class="no-data">No hay datos disponibles para los filtros seleccionados.</p>
  {/if}
</div>
</main>

<style>
  main {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    padding: 10px;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .queso {
    width: 67%;
    border: 3px solid #006D1F;
    border-radius: 12px;
    height: 200px;
    padding: 5px;
    background: #f8f9fa;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #34495e;
  }

  svg {
    display: block;
    margin: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .no-data {
    font-size: 18px;
    color: red;
    font-weight: bold;
  }
</style>