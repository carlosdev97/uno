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

        <button class="btn btn-light border fw-bold w-100">Ingresar</button>
      </div>

      <div class="mt-3">
        <small><a href="#" class="text-decoration-none">Registrarse</a></small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped></style>
