<template>
  <div class="container-create text-center" >
    <div class="card card-create" >
      <div class="card-body card-body-create" >
        <div class="container-box" >
          <div class="container-info conta me-3" style="width: 500px; padding: 8px;">
            <h4>Lista de participantes</h4>
            <table class="table table-striped table-bordered">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Turno</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, index) in participantesOrdenados" :key="index">
                  <td>{{ p.nombre }}</td>
                  <td>#{{ p.ordenTurno }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="estado === 'No iniciada'" class="container-buttons d-grid" style="width: 250px; padding: 8px;">
            <h3 class="me-2">Código: {{ codigo }}</h3>
            <h5>Estado de la partida: <span class="badge bg-primary">{{ estado }}</span></h5>
            <button class="btn btn-success mt-3" @click="iniciarPartida">Iniciar partida</button>
            <button class="btn btn btn-outline-danger mt-3" @click="$router.push('/home')">Volver</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { createGame } from "../firebase/CreateGame.js"

const codigo = ref("");
const participantes = ref([]);
const estado = ref("No iniciada");
const router = useRouter();

const { game, inicializarJuego, iniciarPartida, escucharJugadores } = createGame((url) => router.push(url));

const participantesOrdenados = computed(() => {
  // Clona el array y lo ordena por ordenTurno
  return [...participantes.value].sort((a, b) => a.ordenTurno - b.ordenTurno);
});

onMounted(async () => {
  await inicializarJuego();
  codigo.value = game.codigo;
  participantes.value = game.participantes;
  estado.value = game.estado;

  escucharJugadores(game.codigo, (jugadores) => {
    console.log("🔥 Jugadores desde Firebase:", jugadores);
    participantes.value = jugadores;
  });
});
</script>


<style scoped>
@import "../styles/createGame.css";
</style>