    import { ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
    import { getFirestore, doc, getDoc } from "firebase/firestore";
    import { useRouter } from "vue-router";

    const user = ref(null);
    const userName = ref("");

    let authInitialized = false;

    export function useHome() {
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();

    // Esto asegura que no se duplique el listener al llamar varias veces
    if (!authInitialized) {
        authInitialized = true;

        onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            user.value = currentUser;

            const userDoc = await getDoc(doc(db, "usuarios", currentUser.uid));
            if (userDoc.exists()) {
            userName.value = userDoc.data().name;
            } else {
            userName.value = currentUser.displayName || "Usuario";
            }
        } else {
            user.value = null;
            userName.value = "";
            router.push("/");
        }
        });
    }

    const handleLogout = async () => {
        try {
        await signOut(auth);
        router.push("/");
        } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
        }
    };

    return { userName, handleLogout };
    }
