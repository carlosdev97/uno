<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center border rounded p-4 shadow" style="width: 420px">
      <h3 class="fw-bold mb-4">Iniciar sesión</h3>

      <div class="border rounded p-3 bg-light text-start">
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Correo</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="correo@ejemplo.com"
            v-model="email"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="********"
            v-model="password"
          />
        </div>

        <button
          class="btn btn-light border fw-bold w-100"
          @click="handleSubmit"
        >
          Ingresar
        </button>
      </div>

      <div class="mt-3">
        <small><a href="#" class="text-decoration-none">Registrarse</a></small>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const handleSubmit = async () => {
      if (!email.value || !password.value) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert("Inicio de sesión exitoso.");
        router.push("/lobby"); // Redirigir a la página de lobby después de iniciar sesión
      } catch (error) {
        alert("Error al iniciar sesión. Inténtalo de nuevo.");
        alert(error.message);
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
