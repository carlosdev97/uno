<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center border rounded p-4 shadow" style="width: 420px">
      <h3 class="fw-bold mb-4">Registro</h3>

      <div class="border rounded p-3 bg-light text-start">
        <div class="mb-3">
          <label for="username" class="form-label fw-bold"
            >Nombre de usuario</label
          >
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Ingresa tu nombre de usuario"
            v-model="username"
          />
        </div>

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
          Registrarse
        </button>
      </div>

      <div class="mt-3">
        <small
          ><a href="#" class="text-decoration-none">iniciar sesión</a></small
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
} from "../firebase";
import { updateProfile } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    // Función para verificar si el usuario ya existe
    const checkUserExists = async (email) => {
      const userRef = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userRef);
      return !userSnapshot.empty; // Si el usuario ya existe, devuelve true
    };

    // Función para manejar el registro de usuarios
    const handleSubmit = async () => {
      if (!username.value || !email.value || !password.value) {
        alert("Por favor, completa todos los campos");
        return;
      }

      try {
        const userExists = await checkUserExists(email.value);
        if (userExists) {
          alert("El correo ya está en uso");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: username.value });

        // Guardar en Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: username.value,
          email: user.email,
          createdAt: new Date(),
        });

        alert("¡Registro exitoso!");
        router.push("/login");
      } catch (error) {
        console.log(error.message);
      }
    };

    return {
      username,
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
