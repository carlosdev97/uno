<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center border rounded p-4 shadow" style="width: 320px">
      <h4 class="fw-bold mb-3 border p-2 rounded">¡Bienvenido!</h4>

      <img
        src="../assets/uno.png"
        alt="Logo UNO"
        class="mb-4"
        style="width: 100px"
      />

      <div class="border rounded p-3 bg-light mb-3">
        <button class="btn btn-light border fw-bold w-100 mb-2">Unirse</button>
        <button class="btn btn-light border fw-bold w-100">
          Crear Partida
        </button>
      </div>

      <button class="btn btn-light border fw-bold w-100">Salir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
};
</script>

<style scoped></style>
