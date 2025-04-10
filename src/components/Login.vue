<template>
  <div class="container-login" >
    <div class="card card-login " >
      <div class="card-body card-body-login ">
        <div class="box-form">
          <div class="img-login">
            <img src="../assets/uno.png" class="" alt="LogoUno" style=" width: 80%;">
          </div>
          <div class="container-datas">
            
            <form class="form-login" @submit.prevent="handleLogin">
              <div class="container-data">
                <div class="">
                  <h1 class="text-center">Iniciar Sesión</h1>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" v-model="email" />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" v-model="password" />
                  </div>
                </div>
              </div>

              <!-- Botón y link debajo -->
              <div class="d-grid mb-3">
                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
              </div>

              <p class="text-center">
                ¿No tienes cuenta?
                <router-link to="/register">Regístrate aquí</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLogin } from '../firebase/Login.js';

export default {
  setup() {
    const { email, password, handleLogin } = useLogin();

    return { 
      email, 
      password, 
      handleLogin 
    };
  }
};
</script>

<style scoped>
@import '../styles/login.css';
</style>