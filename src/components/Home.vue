<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center border rounded p-4 shadow" style="width: 300px">
      <img
        src="../assets/uno.png"
        alt="Logo UNO"
        class="mb-4"
        style="width: 120px"
      />
      <div class="border rounded p-3 bg-light">
        <RouterLink to="/login" class="btn btn-light border fw-bold w-100 mb-2">
          Ingresar
        </RouterLink>
        <RouterLink to="/register" class="btn btn-light border fw-bold w-100">
          Registrarse
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "Home",
};
</script>

<style scoped></style>
