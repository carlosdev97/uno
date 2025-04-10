<template>
  <div class="container-inicio">
    <div class="card card-inicio">
      <div class="card-body card-body-inicio">
        <img src="../assets/uno.png" class="logo d-block mx-auto" alt="LogoUno" style=" width: 120px;">
        <p class="text-center mt-2">Bienvenido, <span style="color: yellow">{{ userName.toUpperCase() }}</span></p>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" @click="$router.push('/create-game')">Crear partida</button>
          <button class="btn btn-success" @click="$router.push('/join-game')">Unirse a partida</button>
          <button class="btn btn-outline-danger" @click="handleLogout">Cerrar sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHome } from "../firebase/Home.js";

const { userName, handleLogout } = useHome();
</script>

<style scoped>
@import "../styles/home.css";
</style>