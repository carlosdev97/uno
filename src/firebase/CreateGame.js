    import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, getDocs,} from "firebase/firestore";
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
    
        const generarCodigo = () =>
        Math.floor(1000 + Math.random() * 9000).toString();
    
        async function inicializarJuego() {
        const user = auth.currentUser;
        if (!user) return;
    
        const userNombre = user.displayName || "Jugador";
        let nuevoCodigo = generarCodigo();
        let partidasRef = doc(db, "partidas", nuevoCodigo);
    
        try {
            const partidaSnap = await getDoc(partidasRef);
            if (partidaSnap.exists()) {
            nuevoCodigo = generarCodigo();
            partidasRef = doc(db, "partidas", nuevoCodigo);
            }
    
            await setDoc(partidasRef, {
            codigo: nuevoCodigo,
            estado: "No iniciada",
            uidCreador: user.uid,
            usuarioCreador: userNombre,
            });
    
            const jugadoresSnapshot = await getDocs(
            collection(db, `partidas/${nuevoCodigo}/jugadores`)
            );
            const ordenTurno = jugadoresSnapshot.size + 1;
    
            if (ordenTurno > 4) {
            Swal.fire(
                "Límite de jugadores alcanzado",
                "No se pueden agregar más de 4 jugadores.",
                "error"
            );
            return;
            }
    
            const jugadorRef = doc(
            db,
            `partidas/${nuevoCodigo}/jugadores`,
            user.uid
            );
            await setDoc(jugadorRef, {
            uid: user.uid,
            nombre: userNombre,
            ordenTurno: ordenTurno,
            });
    
            game.codigo = nuevoCodigo;
            game.participantes = [
            { uid: user.uid, nombre: userNombre, ordenTurno },
            ];
            game.estado = "No iniciada";
    
            // ✅ GUARDAR EL CÓDIGO EN localStorage
            localStorage.setItem("codigoPartida", nuevoCodigo);
    
            // ✅ ESCUCHAR CAMBIOS
            escucharCambios(nuevoCodigo);
    
        } catch (error) {
            console.error("Error al crear la partida:", error);
            Swal.fire(
            "Error",
            "No se pudo crear la partida. Inténtalo de nuevo.",
            "error"
            );
        }
        }
    
        function escucharCambios(codigo) {
        const partidaRef = doc(db, "partidas", codigo);
    
        onSnapshot(partidaRef, (docSnap) => {
            if (docSnap.exists()) {
            const data = docSnap.data();
            game.estado = data.estado;
    
            if (
                data.estado === "iniciada" &&
                typeof redirectCallback === "function"
            ) {
                redirectCallback(`/partida/${codigo}`);
            }
            }
        });
    
        onSnapshot(collection(db, `partidas/${codigo}/jugadores`), (querySnapshot) => {
            game.participantes = querySnapshot.docs.map((doc) => doc.data());
        });
        }
    
        // ✅ Verificar si hay una partida en localStorage y reconectar
        onReconnect();
    
        function onReconnect() {
        const codigoGuardado = localStorage.getItem("codigoPartida");
        if (codigoGuardado) {
            game.codigo = codigoGuardado;
            escucharCambios(codigoGuardado);
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
            const jugadoresSnapshot = await getDocs(
                collection(db, `partidas/${game.codigo}/jugadores`)
            );
            if (jugadoresSnapshot.size < 2) {
                Swal.fire(
                "Mínimo de jugadores no alcanzado",
                "Necesitas al menos 2 jugadores para iniciar la partida.",
                "error"
                );
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
            const jugadores = snapshot.docs.map((doc) => doc.data());
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
    