<script>
// @ts-nocheck

  import Filtros from './lib/Filtros.svelte';
  import VicPorSexo from './lib/VicPorSexo.svelte';
  import SupPorPuerto from './lib/SupPorPuerto.svelte';
  import SupPorSexo from './lib/SupPorSexo.svelte';
</script>

<main>
  <h1>Dashboard Titanic</h1>
  <div class="content">

  
  <Filtros />
  <section class="charts">
    
    <SupPorPuerto />
    <VicPorSexo /> 
    <SupPorSexo /> 
  </section>
  </div>

  
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #FFF8E5;
    min-height: 65vh;
    padding: 10px;
    border:3px solid #bbb ;
    border-radius: 10px;
    
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  section{
    width: 100%;
    padding: 10px;
   
  }
</style>