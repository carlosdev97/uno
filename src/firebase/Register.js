
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';

export function useRegister() {
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const auth = getAuth();
  const db = getFirestore();

  const verificarNombreUnico = async (nombre) => {
    const q = query(collection(db, "usuarios"), where("name", "==", nombre));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleAuthError = (errorCode) => {
    const errorMessages = {
      'auth/email-already-in-use': "El correo ya está registrado.",
      'auth/invalid-email': "Correo inválido.",
      'auth/weak-password': "La contraseña debe tener al menos 6 caracteres.",
    };
    Swal.fire({
      icon: "error",
      title: "Error de autenticación",
      text: errorMessages[errorCode] || "Error al registrar. Inténtalo de nuevo.",
      confirmButtonText: "OK",
    });
  };

  const handleRegister = async () => {
    if (!name.value || !email.value || !password.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios.',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const existeNombre = await verificarNombreUnico(name.value);
      if (existeNombre) {
        Swal.fire({
          icon: 'error',
          title: 'Nombre en uso',
          text: 'El nombre de usuario ya fue registrado por otro jugador.',
          confirmButtonText: 'OK'
        });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name.value });

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        name: name.value,
        email: email.value,
      });
      
      Swal.fire({
        icon: "success",
        title: "Registrado",
        text: "Usuario registrado.",
        confirmButtonText: "OK",
      });
      router.push("/");
    } catch (error) {
      handleAuthError(error.code);
    }
  };

  return { 
    name, 
    email, 
    password, 
    handleRegister 
  };
}