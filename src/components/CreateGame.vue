<template>
  <div class="container-create text-center">
    <div class="card card-create">
      <div class="card-body card-body-create">
        <h3 class="me-2">Código: {{ codigo }}</h3>
        <h5>Estado de la partida: <span class="badge bg-primary">{{ estado }}</span></h5>
        <h4>Lista de participantes</h4>
        <ul class="list-group">
          <li v-for="(p, index) in participantes" :key="index" class="list-group-item">
            {{ p.nombre }} - ${{ p.saldo }}
          </li>
        </ul>
        <div v-if="estado === 'No iniciada'" class="d-grid">
          <button class="btn btn-outline-primary mt-3" @click="iniciarPartida">Iniciar partida</button>
          <button class="btn btn-danger mt-3" @click="$router.push('/inicio')">Volver</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

export default {
  setup() {
    const codigo = ref("");
    const participantes = ref([]);
    const estado = ref("No iniciada");
    const auth = getAuth();
    const db = getFirestore();
    const router = useRouter();
    
    const generarCodigo = () => Math.floor(1000 + Math.random() * 9000).toString();

    onMounted(async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userNombre = user.displayName || "Jugador";
      let nuevoCodigo = generarCodigo();
      let partidasRef = doc(db, "partidas", nuevoCodigo);

      try {
        // Verifica si la partida ya existe
        const partidaSnap = await getDoc(partidasRef);
        if (partidaSnap.exists()) {
          nuevoCodigo = generarCodigo(); // Genera otro si ya existe
          partidasRef = doc(db, "partidas", nuevoCodigo);
        }

        // Crea la nueva partida
        await setDoc(partidasRef, {
          codigo: nuevoCodigo,
          estado: "No iniciada",
          uidCreador: user.uid,
          usuarioCreador: userNombre
        });

        // Añade el jugador como un documento en la subcolección "jugadores"
        const jugadorRef = doc(db, `partidas/${nuevoCodigo}/jugadores`, user.uid);
        await setDoc(jugadorRef, {
          uid: user.uid,
          nombre: userNombre,
          saldo: 1500
        });

        // Asignar valores locales
        codigo.value = nuevoCodigo;
        participantes.value = [{ uid: user.uid, nombre: userNombre, saldo: 1500 }];
        estado.value = "No iniciada";

        // Escuchar cambios en la subcolección "jugadores"
        onSnapshot(partidasRef, (docSnap) => {
          if (docSnap.exists()) {
            estado.value = docSnap.data().estado;

            if (docSnap.data().estado === "iniciada") {
              router.push(`/partida/${nuevoCodigo}`);
            }
          }
        });

        onSnapshot(
          collection(db, `partidas/${nuevoCodigo}/jugadores`),
          (querySnapshot) => {
            participantes.value = querySnapshot.docs.map((doc) => doc.data());
          }
        );

      } catch (error) {
        console.error("Error al crear la partida:", error);
        Swal.fire("Error", "No se pudo crear la partida. Inténtalo de nuevo.", "error");
      }
    });

    const iniciarPartida = async () => {
      try {
        const confirmar = await Swal.fire({
          title: "¿Iniciar partida?",
          text: "Una vez iniciada, no podrás agregar más jugadores.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, iniciar",
          cancelButtonText: "Cancelar"
        });

        if (confirmar.isConfirmed) {
          // Valida si el número de jugadores es suficiente
          const jugadoresSnapshot = await getDocs(collection(db, `partidas/${codigo.value}/jugadores`));
          if (jugadoresSnapshot.size < 2) {
            Swal.fire("Mínimo de jugadores no alcanzado", "Necesitas al menos 2 jugadores para iniciar la partida.", "error");
            return;
          }

          const partidaRef = doc(db, "partidas", codigo.value);
          await updateDoc(partidaRef, { estado: "iniciada" });
        }
      } catch (error) {
        console.error("Error al iniciar la partida:", error);
        Swal.fire("Error", "No se pudo iniciar la partida.", "error");
      }
    };

    return { codigo, participantes, estado, iniciarPartida };
  },
};
</script>

<style scoped>
@import "../styles/createGame.css";
</style>
