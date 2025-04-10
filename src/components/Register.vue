<template>
  <div class="container-register">
    <div class="card card-register mx-auto">
      <div class="card-body card-body-register">
        <div class="box-form">
          <div class="img-login">
            <img src="../assets/uno.png" class="" alt="LogoUno" style=" width: 80%;">
          </div>
          <form @submit.prevent="handleRegister">
            <div class="container-data">
              <div class="">
                <h2 class="text-center">Registro</h2>
              </div>
              <div class="col-md-6 mb-3 w-100">
                <label class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control" style="height: 50px;" v-model="name" />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control" v-model="email" />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Contraseña</label>
                  <input type="password" class="form-control" v-model="password" />
                </div>
              </div>
            </div>

            <!-- Botón de registro -->
            <div class="d-grid mb-0" style="margin-bottom: 0%;">
              <button type="submit" class="btn btn-primary">Registrarse</button>
            </div>

            <!-- Enlace para login -->
            <p class="text-center mt-1">
              ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
            </p>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useRegister } from '../firebase/Register.js';

export default {
  setup() {
    const { name, email, password, handleRegister } = useRegister();
    
    return { 
      name, 
      email, 
      password, 
      handleRegister 
    };
  }
};
</script>

<style scoped>
@import '../styles/register.css';
</style>