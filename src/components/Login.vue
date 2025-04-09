<template>
  <div class="container-login">
    <div class="card card-login">
      <div class="card-body card-body-login">
        <h1 class="text-center">Iniciar Sesión</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
          </div>
        </form>
        <p class="mt-3 text-center">
          ¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import Swal from 'sweetalert2';


export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    
    const handleLogin = async () => {
      if ( !email.value || !password.value) {
        //alerta de sweetalert2
        Swal.fire({
        title: '¡Error!',
        text: 'Debes llenar todos los campos.',
        icon: 'error',
        });
        
        return;
      }
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);

      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        router.push("/home");
      });

    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      Swal.fire({
        title: 'Error',
        text: error.message.includes('auth/user-not-found')
          ? 'El usuario no existe.'
          : error.message.includes('auth/wrong-password')
          ? 'Contraseña incorrecta.'
          : 'No se puede iniciar sesión.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  };


    const handleAuthError = (errorCode) => {
      const errorMessages = {
        'auth/invalid-credential': "Correo o contraseña incorrectos",
        'auth/user-not-found': "El usuario no está registrado",
        'auth/wrong-password': "Contraseña incorrecta",
        'auth/invalid-email': "Correo no válido",
        'auth/user-disabled': "Este usuario ha sido deshabilitado",
      };
      
      Swal.fire({
        title: '¡Problemas!',
        text: {errorMessages},
        icon: 'Error',
        confirmButtonText: 'Intentar de nuevo.'
      })
    };

    return { email, password, handleLogin };
  }
};
</script>

<style scoped>
@import '../styles/login.css';
</style>