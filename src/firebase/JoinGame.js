import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

export function useFunctionJionGame()  {
  
    const codigoIngresado = ref("");
    const mensaje = ref("");
    const esperandoInicio = ref(false);
    const partidaIniciada = ref(false);
    const jugadores = ref([]);

    const auth = getAuth();
    const db = getFirestore();
    const router = useRouter();

    const unirseAPartida = async () => {
      try {
        if (!codigoIngresado.value) {
          Swal.fire("Error", "Debes ingresar un código de partida.", "error");
          return;
        }

        const partidaRef = doc(db, "partidas", codigoIngresado.value);
        const partidaSnap = await getDoc(partidaRef);

        if (!partidaSnap.exists()) {
          Swal.fire("Error", "El código de la partida no existe.", "error");
          return;
        }

        const user = auth.currentUser;
        if (!user) {
          Swal.fire("Error", "Debes iniciar sesión para unirte a una partida.", "error");
          return;
        }

        const { displayName, uid } = user;
        const jugadorActual = displayName || "Jugador";

        const jugadoresRef = collection(db, `partidas/${codigoIngresado.value}/jugadores`);
        const jugadorDocRef = doc(jugadoresRef, uid);
        const jugadorSnap = await getDoc(jugadorDocRef);

        // Verifica si el jugador ya está registrado en la partida
        if (jugadorSnap.exists()) {
          Swal.fire("Bienvenido de vuelta", "Ya estás registrado en esta partida.", "info");
          router.push("/partida/" + codigoIngresado.value);
          return;
        }

        // Valida si la partida ya está iniciada
        if (partidaSnap.data().estado === "iniciada") {
          Swal.fire("Partida en curso", "La partida ya ha comenzado. No puedes unirte en este momento.", "warning");
          return;
        }

        // Valida si la partida ya está llena
        const jugadoresSnapshot = await getDocs(jugadoresRef);
        if (jugadoresSnapshot.size >= 4) {
          Swal.fire("Sala llena", "La sala ha alcanzado su capacidad máxima de jugadores.", "error");
          return;
        }

        // Determina el siguiente turno disponible
        const ordenTurno = jugadoresSnapshot.size + 1;

        // Añade al jugador como un documento en la subcolección "jugadores"
        await setDoc(jugadorDocRef, { nombre: jugadorActual, ordenTurno, uid });

        esperandoInicio.value = true;
        Swal.fire({
          title: "Nuevo jugador en la sala",
          icon: "success",
          text: `¡Bienvenido a la sala ${codigoIngresado.value}! ${jugadorActual} se ha unido al juego.`,
        });

        mensaje.value = "Te has unido a la partida. Esperando que el anfitrión inicie...";

        // Escuchar cambios en la partida
        onSnapshot(partidaRef, (docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().estado === "iniciada") {
              partidaIniciada.value = true;
              esperandoInicio.value = false;
            }
          }
        });

        // Escuchar cambios en la subcolección "jugadores"
        onSnapshot(jugadoresRef, (querySnapshot) => {
          jugadores.value = querySnapshot.docs.map((doc) => doc.data());
        });
      } catch (error) {
        console.error("Error al unirse a la partida:", error);
        Swal.fire("Error", "No se pudo unir a la partida.", "error");
      }
    };

    // Redirigir cuando la partida se inicie
    watchEffect(() => {
      if (partidaIniciada.value) {
        router.push("/partida/" + codigoIngresado.value);
      }
    });

    return {
      codigoIngresado,
      mensaje,
      esperandoInicio,
      partidaIniciada,
      jugadores,
      unirseAPartida,
    };
}
