<template>
  <div class="container-partida">
    <nav>
      <img src="../assets/uno.png" class="logo" alt="LogoUno" style="width: 50px;">
      <div class="dropdown">
        <button class="btn btn-success dropdown-toggle me-5" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
          Más opciones
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li><button class="dropdown-item" type="button">Ver historial</button></li>
          <li><button class="dropdown-item" type="button">Salir de la partida</button></li>
        </ul>
      </div>
    </nav>

    <main>
      <div class="container-mesa">
        <div class="mesa-top">
          <button class="btn-baraja">
            <img src="../assets/baraja.png" class="img-baraja" alt="">
          </button>
          <p class="m-5" style="color: white;">Turno: Jugador1</p>
        </div>

        <div class="mesa-bottom p-3">
          <div 
            v-for="(jugador, index) in participantes"
            :key="index"
            :id="`jugador-${posiciones[index]}`"
            class="container-cartas-player d-flex flex-column align-items-center position-absolute"
          >
            <h5>{{ jugador.nombre || `Jugador ${index + 1}` }}</h5>
            <div class="carta-con-contador d-flex align-items-center">
              <img src="../assets/Carta.jpeg" alt="Carta">
              <h4 class="btn btn-warning m-2"> +{{ jugador.cartas?.length || 0 }} </h4>
            </div>
          </div>
          <div class="cartas-mesa">
            <tr v-for="item in historial" :key="item.id">
              <td>{{ item.id_carta }}</td>
            </tr>

          </div>
          <img src="../assets/mesa.png" class="img-mesa" alt="">
        </div>
      </div>

      <div class="container-acciones">
        <div class="cartas">
          <table class="cartas-table ">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Color</th>
                <th>Valor</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="carta in cartasDelJugador" :key="carta.id">
                <td>
                  <img 
                    :src="`../assets/carta-azul.png`" 
                    :alt="`Carta ${carta.color}`"
                    class="card-image"
                  >
                </td>
                <td>{{ carta.color }}</td>
                <td>{{ carta.valor }}</td>
                <td>
                  <button class="btn btn-primary" @click="tirarCarta(carta)">Tirar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="acciones">
          <button class="btn btn-success m-3">📣 UNO!!</button>
          <button class="btn btn-warning m-3">✋🏻</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRoute } from 'vue-router';

const route = useRoute();
const participantes = ref([]);
const posiciones = ['centrado', 'izquierda', 'derecha', 'abajo']; // Se asigna por orden

const historial = ref([]);
const loading = ref(true);

// Escuchar jugadores
function escucharJugadores(codigo, callback) {
  const jugadoresRef = collection(db, "partidas", codigo, "jugadores");
  return onSnapshot(jugadoresRef, (snapshot) => {
    const jugadores = snapshot.docs.map(doc => doc.data());
    callback(jugadores);
  });
}

onMounted(async () => { // ✅ Agrega async aquí
  const codigoPartida = route.params.codigo;
  
  // Escuchar jugadores
  escucharJugadores(codigoPartida, (jugadores) => {
    console.log("🔥 Jugadores desde Firebase:", jugadores);
    participantes.value = jugadores;
  });

  // Cargar historial
  try {
    const querySnapshot = await getDocs(
      collection(db, `partidas/${codigoPartida}/historial`)
    );
    
    historial.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al cargar historial:", error);
  } finally {
    loading.value = false;
  }
});

const cartasDelJugador = ref([
  { id: 1, color: 'rojo', valor: '5' },
  { id: 2, color: 'azul', valor: '2' },
  { id: 3, color: 'verde', valor: 'cambio' },
  { id: 4, color: 'amarillo', valor: '+2' },
]);

function tirarCarta(carta) {
  console.log(`🃏 Carta tirada:`, carta);
  // Aquí puedes poner lógica para eliminar la carta o lo que necesites
}
</script>

<style scoped>
@import '../styles/partida.css';
.historial-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.historial-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.historial-table th, .historial-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.historial-table th {
  background-color: #f2f2f2;
}

.historial-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.loading {
  padding: 20px;
  text-align: center;
  font-style: italic;
  color: #666;
}
</style>
