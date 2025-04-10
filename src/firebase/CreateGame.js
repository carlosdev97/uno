    import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, getDocs } from "firebase/firestore";
    import { getAuth } from "firebase/auth";
    import Swal from "sweetalert2";

    const db = getFirestore();
    const auth = getAuth();

    export function createGame(redirectCallback) {
    const game = {
        codigo: "",
        participantes: [],
        estado: "No iniciada",
    };

    const generarCodigo = () => Math.floor(1000 + Math.random() * 9000).toString();

    async function inicializarJuego() {
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
            usuarioCreador: userNombre,
        });

        // Obtén el número de jugadores actuales para asignar el orden de turno
        const jugadoresSnapshot = await getDocs(collection(db, `partidas/${nuevoCodigo}/jugadores`));
        const ordenTurno = jugadoresSnapshot.size + 1;

        if (ordenTurno > 4) {
            Swal.fire("Límite de jugadores alcanzado", "No se pueden agregar más de 4 jugadores.", "error");
            return;
        }

        // Añade el jugador a la subcolección
        const jugadorRef = doc(db, `partidas/${nuevoCodigo}/jugadores`, user.uid);
        await setDoc(jugadorRef, {
            uid: user.uid,
            nombre: userNombre,
            ordenTurno: ordenTurno,
        });

        // Asignar valores
        game.codigo = nuevoCodigo;
        game.participantes = [{ uid: user.uid, nombre: userNombre, ordenTurno }];
        game.estado = "No iniciada";

        // Escuchar cambios de estado
        onSnapshot(partidasRef, (docSnap) => {
            if (docSnap.exists()) {
            const data = docSnap.data();
            game.estado = data.estado;

            if (data.estado === "iniciada" && typeof redirectCallback === "function") {
                redirectCallback(`/partida/${nuevoCodigo}`);
            }
            }
        });

        // Escuchar cambios en la lista de jugadores
        onSnapshot(collection(db, `partidas/${nuevoCodigo}/jugadores`), (querySnapshot) => {
            game.participantes = querySnapshot.docs.map((doc) => doc.data());
        });

        } catch (error) {
        console.error("Error al crear la partida:", error);
        Swal.fire("Error", "No se pudo crear la partida. Inténtalo de nuevo.", "error");
        }
    }

    async function iniciarPartida() {
        try {
        const confirmar = await Swal.fire({
            title: "¿Iniciar partida?",
            text: "Una vez iniciada, no podrás agregar más jugadores.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, iniciar",
            cancelButtonText: "Cancelar",
        });

        if (confirmar.isConfirmed) {
            const jugadoresSnapshot = await getDocs(collection(db, `partidas/${game.codigo}/jugadores`));
            if (jugadoresSnapshot.size < 2) {
            Swal.fire("Mínimo de jugadores no alcanzado", "Necesitas al menos 2 jugadores para iniciar la partida.", "error");
            return;
            }

            const partidaRef = doc(db, "partidas", game.codigo);
            await updateDoc(partidaRef, { estado: "iniciada" });
        }
        } catch (error) {
        console.error("Error al iniciar la partida:", error);
        Swal.fire("Error", "No se pudo iniciar la partida.", "error");
        }
    }

    function escucharJugadores(codigo, callback) {
        const jugadoresRef = collection(db, "partidas", codigo, "jugadores");
        return onSnapshot(jugadoresRef, (snapshot) => {
            const jugadores = snapshot.docs.map(doc => doc.data());
            callback(jugadores);
        });
        }

    return {
        game,
        inicializarJuego,
        iniciarPartida,
        escucharJugadores,
    };
}
