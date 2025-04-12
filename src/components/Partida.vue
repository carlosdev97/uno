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
          <li><button class="dropdown-item" type="button" @click="$router.push('/home')">Salir de la partida</button></li>
        </ul>
      </div>
    </nav>

    <main>
      <div class="container-mesa">
        <div class="mesa-top">
          <button class="btn-baraja" @click="robarCarta">
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
              <h4 class="btn btn-warning m-2"> +{{ jugador.totalCartas || 0 }} </h4>
            </div>
          </div>
          <div class="cartas-mesa">
            <div v-if="historial.length > 0">
              <div v-for="item in historial" :key="item.id">
                <div v-if="item.ordenHistorial === 0" class="carta-inicial-info">
                  <p><strong>Carta inicial:</strong></p>
                  <p><strong>Color:</strong> {{ obtenerInfoCarta(item.id_carta)?.color || 'Desconocido' }}</p>
                  <p><strong>Numero:</strong> {{ obtenerInfoCarta(item.id_carta)?.numero || 'Desconocido' }}</p>
                  <p><strong>Tipo:</strong> {{ obtenerInfoCarta(item.id_carta)?.tipo || 'Desconocido' }}</p>
                </div>
              </div>
            </div>
          </div>
          <img src="../assets/mesa.png" class="img-mesa" alt="">
        </div>
      </div>

      <div class="container-acciones">
        <div class="cartas-wrapper">
    <div class="cartas-scroll-container">
      <table class="cartas-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Color</th>
            <th>Valor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
              <tr v-for="carta in cartasJugadorActual" :key="carta.id">
                <td>
                  <img 
                    :src="`../assets/carta-${carta.color || 'azul'}.png`" 
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
import { collection, onSnapshot, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRoute } from 'vue-router';
import { getAuth } from "firebase/auth";

const route = useRoute();
const codigoPartida = route.params.codigo;
const participantes = ref([]);
const posiciones = ['centrado', 'izquierda', 'derecha', 'abajo'];
const historial = ref([]);
const cartasJugadorActual = ref([]);
const loading = ref(true);
const auth = getAuth();
const jugadorActualId = auth.currentUser?.uid;
const todasLasCartas = ref([]);


// Modifica la función escucharJugadores
function escucharJugadores(codigo, callback) {
  const jugadoresRef = collection(db, "partidas", codigo, "jugadores");
  return onSnapshot(jugadoresRef, async (snapshot) => {
    const jugadores = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Obtener el ID del jugador autenticado
    const auth = getAuth();
    const jugadorActualId = auth.currentUser?.uid;

    // Para cada jugador, contar las cartas
    for (const jugador of jugadores) {
      const cartasRef = collection(
        db, 
        `partidas/${codigo}/cartas_jugadores/${jugador.id}/cartas_jugador`
      );
      const cartasSnapshot = await getDocs(cartasRef);
      jugador.totalCartas = cartasSnapshot.size;
      
      // Si es el jugador actual, cargar sus cartas
      if (jugador.id === jugadorActualId) {
        await cargarCartasJugador(jugadorActualId);
      }
    }

    callback(jugadores);
  });
}

onMounted(async () => {
  const cartasRef = collection(db, "cartas");
  const snapshot = await getDocs(cartasRef);
  todasLasCartas.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
});

onMounted(async () => {

  const auth = getAuth();
  const jugadorActualId = auth.currentUser?.uid;

  // Escuchar jugadores
  escucharJugadores(codigoPartida, (jugadores) => {
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

  // Asignar cartas al inicio
  await asignarCartasAJugadores(codigoPartida);
});

// Asegúrate que cargarCartasJugador use el ID correcto
async function cargarCartasJugador(jugadorId) {
  if (!jugadorId) {
    console.error("No se proporcionó ID de jugador");
    return;
  }
  
  try {
    const cartasRef = collection(
      db, 
      `partidas/${codigoPartida}/cartas_jugadores/${jugadorId}/cartas_jugador`
    );
    const snapshot = await getDocs(cartasRef);
    cartasJugadorActual.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`Cartas cargadas para jugador ${jugadorId}`);
  } catch (error) {
    console.error("Error al cargar cartas:", error);
  }
}

async function asignarCartasAJugadores(codigoPartida) {
  try {
    const cartasRef = collection(db, "cartas");
    const cartasSnapshot = await getDocs(cartasRef);
    const cartas = cartasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (cartas.length < 28) {
      throw new Error("No hay suficientes cartas para repartir a los jugadores.");
    }

    // Barajar las cartas
    let cartasBarajadas = [...cartas].sort(() => Math.random() - 0.5);

    const jugadoresRef = collection(db, `partidas/${codigoPartida}/jugadores`);
    const jugadoresSnapshot = await getDocs(jugadoresRef);
    const jugadores = jugadoresSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (jugadores.length < 2) {
      throw new Error("Debe haber al menos 2 jugadores para repartir las cartas.");
    }

    for (const jugador of jugadores) {
      const cartasJugadorRef = collection(
        db,
        `partidas/${codigoPartida}/cartas_jugadores/${jugador.id}/cartas_jugador`
      );
      const cartasExistentesSnapshot = await getDocs(cartasJugadorRef);

      // Si el jugador ya tiene cartas, no asignar más
      if (!cartasExistentesSnapshot.empty) {
        console.log(`🔁 Jugador ${jugador.id} ya tiene cartas asignadas.`);
        continue;
      }

      // Asignar exactamente 7 cartas al jugador
      const cartasJugador = cartasBarajadas.splice(0, 7); // Extraer 7 cartas del mazo
      for (const carta of cartasJugador) {
        const cartaJugadorRef = doc(
          db,
          `partidas/${codigoPartida}/cartas_jugadores/${jugador.id}/cartas_jugador`,
          String(carta.id)
        );

        await setDoc(cartaJugadorRef, {
          id: carta.id,
          tipo: carta.tipo,
          color: carta.color,
          valor: carta.numero,
          id_jugador: jugador.id,
        });
      }
    }

    // ✅ Elegir una carta inicial del mazo restante y guardarla en el historial
    if (cartasBarajadas.length > 0) {
      const historialRef = collection(db, `partidas/${codigoPartida}/historial`);

      // Verificar si ya existe una carta inicial en el historial
      const historialSnapshot = await getDocs(historialRef);
      const cartaInicialExistente = historialSnapshot.docs.find(
        (doc) => doc.data().ordenHistorial === 0
      );

      if (cartaInicialExistente) {
        console.log("✅ La carta inicial ya está creada:", cartaInicialExistente.data());
      } else {
        const cartaInicial = cartasBarajadas.splice(0, 1)[0];

        const nuevaCartaInicialRef = doc(historialRef);

        await setDoc(nuevaCartaInicialRef, {
          id_carta: cartaInicial.id,
          id_jugador: null,
          ordenHistorial: 0,
        });

        console.log("📝 Carta inicial guardada en el historial:", cartaInicial);
      }
    } else {
      console.warn("⚠️ No quedaron cartas suficientes para asignar al historial.");
    }

    console.log("Cartas asignadas correctamente a los jugadores.");
  } catch (error) {
    console.error("Error al asignar cartas a los jugadores:", error);
  }
}

function obtenerInfoCarta(idCarta) {
  return todasLasCartas.value.find(carta => carta.id === idCarta);
}

function tirarCarta(carta) {
  console.log(`🃏 Carta tirada:`, carta);
}


async function robarCarta() {
  try {
    // Verificar autenticación
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.error("No hay jugador autenticado");
      alert("Debes iniciar sesión para robar cartas");
      return;
    }

    const jugadorActualId = user.uid;
    
    // Verificar que codigoPartida esté definido
    if (!codigoPartida) {
      console.error("Código de partida no definido");
      alert("No se pudo identificar la partida");
      return;
    }

    // 1. Obtener todas las cartas del juego
    const cartasRef = collection(db, "cartas");
    const cartasSnapshot = await getDocs(cartasRef);
    const todasLasCartas = cartasSnapshot.docs.map(doc => ({ 
      id: String(doc.id), // Asegurar que el ID sea string
      ...doc.data() 
    }));

    // 2. Obtener cartas ya asignadas
    const jugadoresRef = collection(db, `partidas/${codigoPartida}/jugadores`);
    const jugadoresSnapshot = await getDocs(jugadoresRef);
    
    let cartasAsignadas = [];
    
    for (const jugadorDoc of jugadoresSnapshot.docs) {
      const cartasJugadorRef = collection(
        db, 
        `partidas/${codigoPartida}/cartas_jugadores/${jugadorDoc.id}/cartas_jugador`
      );
      const cartasJugadorSnapshot = await getDocs(cartasJugadorRef);
      cartasAsignadas = [...cartasAsignadas, ...cartasJugadorSnapshot.docs.map(doc => String(doc.id))];
    }

    // 3. Filtrar cartas disponibles
    const cartasDisponibles = todasLasCartas.filter(
      carta => !cartasAsignadas.includes(String(carta.id))
    );

    if (cartasDisponibles.length === 0) {
      alert("¡No quedan cartas en el mazo!");
      return;
    }

    // 4. Seleccionar una carta aleatoria
    const cartaAleatoria = cartasDisponibles[
      Math.floor(Math.random() * cartasDisponibles.length)
    ];

    console.log("ID de carta a asignar:", cartaAleatoria.id, typeof cartaAleatoria.id);

    // 5. Asignar la carta al jugador actual
    const cartaJugadorRef = doc(
      db,
      `partidas/${codigoPartida}/cartas_jugadores/${jugadorActualId}/cartas_jugador`,
      String(cartaAleatoria.id) // Asegurar que el ID sea string
    );
    
    await setDoc(cartaJugadorRef, {
      id: cartaAleatoria.id,
      tipo: cartaAleatoria.tipo,
      color: cartaAleatoria.color,
      valor: cartaAleatoria.valor || cartaAleatoria.numero,
      id_jugador: jugadorActualId
    });

    // Resto del código...
  } catch (error) {
    console.error("Error completo al robar carta:", error);
    alert("Ocurrió un error al robar la carta: " + error.message);
  }
}

</script>

<style scoped>
@import '../styles/partida.css';
</style>
