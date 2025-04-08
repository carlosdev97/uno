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
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Correo</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="********"
          />
        </div>

        <button class="btn btn-light border fw-bold w-100">Registrarse</button>
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
export default {
  name: "Register",
};
</script>

<style scoped></style>
