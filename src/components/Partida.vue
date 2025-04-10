<template>
  <div class="container-partida">
    <nav>
      <img src="../assets/uno.png" class="logo" alt="LogoUno" style=" width: 50px;">
      <div class="dropdown">
      <button class="btn btn-success dropdown-toggle me-5" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li><button class="dropdown-item" type="button">Salir de la partida</button></li>
        <li><button class="dropdown-item" type="button">Ver historial</button></li>
      </ul>
    </div>
    </nav>
    <main>
      <div class="container-mesa">
        <div class="mesa-top">
          <button>comer</button>
          <p>mensajes</p>
        </div>
        <div class="mesa-bottom">
          <img src="../assets/mesa.png" class="img-mesa" alt="">
        </div>
      </div>
      <div class="container-acciones">
        <h2>cosas</h2>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Lobby",
};
</script>

<style scoped>
@import '../styles/partida.css';
</style>
