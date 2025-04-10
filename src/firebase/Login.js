// src/composables/useLogin.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import Swal from 'sweetalert2';

export function useLogin() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleAuthError = (error) => {
        const errorMessages = {
            'auth/invalid-credential': "Correo o contraseña incorrectos",
            'auth/user-not-found': "El usuario no está registrado",
            'auth/wrong-password': "Contraseña incorrecta",
            'auth/invalid-email': "Correo no válido",
            'auth/user-disabled': "Este usuario ha sido deshabilitado",
        };
        
        Swal.fire({
            title: '¡Error!',
            text: errorMessages[error.code] || error.message,
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
    };

    const handleLogin = async () => {
        if (!email.value || !password.value) {
            Swal.fire({
                title: '¡Error!',
                text: 'Debes llenar todos los campos.',
                icon: 'error',
            });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);
            
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                router.push("/home");
            });

        } catch (error) {
            handleAuthError(error);
        }
    };

    return { 
        email, 
        password, 
        handleLogin 
    };
}