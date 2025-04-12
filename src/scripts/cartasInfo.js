import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, writeBatch, getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCAzBF6W1swc8NqPkvhlDj_sn7fuo5qBj8",
  authDomain: "monopoly-project-3ac53.firebaseapp.com",
  projectId: "monopoly-project-3ac53",
  storageBucket: "monopoly-project-3ac53.firebasestorage.app",
  messagingSenderId: "1082707434484",
  appId: "1:1082707434484:web:d4ade051ce8afb99e537a1",
  measurementId: "G-92NTKNTM5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Definición de todas las cartas del UNO
const cartasUNO = [
  // Cartas normales (0-9) por cada color
  { id: 0, color: 'rojo', tipo: 'normal', numero: '0' },
  { id: 1, color: 'rojo', tipo: 'normal', numero: '1' },
  { id: 2, color: 'rojo', tipo: 'normal', numero: '2' },
  { id: 3, color: 'rojo', tipo: 'normal', numero: '3' },
  { id: 4, color: 'rojo', tipo: 'normal', numero: '4' },
  { id: 5, color: 'rojo', tipo: 'normal', numero: '5' },
  { id: 6, color: 'rojo', tipo: 'normal', numero: '6' },
  { id: 7, color: 'rojo', tipo: 'normal', numero: '7' },
  { id: 8, color: 'rojo', tipo: 'normal', numero: '8' },
  { id: 9, color: 'rojo', tipo: 'normal', numero: '9' },
  { id: 10, color: 'rojo', tipo: 'normal', numero: '1' }, // Segunda carta 1
  { id: 11, color: 'rojo', tipo: 'normal', numero: '2' },
  { id: 12, color: 'rojo', tipo: 'normal', numero: '3' },
  { id: 13, color: 'rojo', tipo: 'normal', numero: '4' },
  { id: 14, color: 'rojo', tipo: 'normal', numero: '5' },
  { id: 15, color: 'rojo', tipo: 'normal', numero: '6' },
  { id: 16, color: 'rojo', tipo: 'normal', numero: '7' },
  { id: 17, color: 'rojo', tipo: 'normal', numero: '8' },
  { id: 18, color: 'rojo', tipo: 'normal', numero: '9' },

  { id: 19, color: 'azul', tipo: 'normal', numero: '0' },
  { id: 20, color: 'azul', tipo: 'normal', numero: '1' },
  { id: 21, color: 'azul', tipo: 'normal', numero: '2' },
  { id: 22, color: 'azul', tipo: 'normal', numero: '3' },
  { id: 23, color: 'azul', tipo: 'normal', numero: '4' },
  { id: 24, color: 'azul', tipo: 'normal', numero: '5' },
  { id: 25, color: 'azul', tipo: 'normal', numero: '6' },
  { id: 26, color: 'azul', tipo: 'normal', numero: '7' },
  { id: 27, color: 'azul', tipo: 'normal', numero: '8' },
  { id: 28, color: 'azul', tipo: 'normal', numero: '9' },
  { id: 29, color: 'azul', tipo: 'normal', numero: '1' },
  { id: 30, color: 'azul', tipo: 'normal', numero: '2' },
  { id: 31, color: 'azul', tipo: 'normal', numero: '3' },
  { id: 32, color: 'azul', tipo: 'normal', numero: '4' },
  { id: 33, color: 'azul', tipo: 'normal', numero: '5' },
  { id: 34, color: 'azul', tipo: 'normal', numero: '6' },
  { id: 35, color: 'azul', tipo: 'normal', numero: '7' },
  { id: 36, color: 'azul', tipo: 'normal', numero: '8' },
  { id: 37, color: 'azul', tipo: 'normal', numero: '9' },

  { id: 38, color: 'verde', tipo: 'normal', numero: '0' },
  { id: 39, color: 'verde', tipo: 'normal', numero: '1' },
  { id: 40, color: 'verde', tipo: 'normal', numero: '2' },
  { id: 41, color: 'verde', tipo: 'normal', numero: '3' },
  { id: 42, color: 'verde', tipo: 'normal', numero: '4' },
  { id: 43, color: 'verde', tipo: 'normal', numero: '5' },
  { id: 44, color: 'verde', tipo: 'normal', numero: '6' },
  { id: 45, color: 'verde', tipo: 'normal', numero: '7' },
  { id: 46, color: 'verde', tipo: 'normal', numero: '8' },
  { id: 47, color: 'verde', tipo: 'normal', numero: '9' },
  { id: 48, color: 'verde', tipo: 'normal', numero: '1' },
  { id: 49, color: 'verde', tipo: 'normal', numero: '2' },
  { id: 50, color: 'verde', tipo: 'normal', numero: '3' },
  { id: 51, color: 'verde', tipo: 'normal', numero: '4' },
  { id: 52, color: 'verde', tipo: 'normal', numero: '5' },
  { id: 53, color: 'verde', tipo: 'normal', numero: '6' },
  { id: 54, color: 'verde', tipo: 'normal', numero: '7' },
  { id: 55, color: 'verde', tipo: 'normal', numero: '8' },
  { id: 56, color: 'verde', tipo: 'normal', numero: '9' },

  { id: 57, color: 'amarillo', tipo: 'normal', numero: '0' },
  { id: 58, color: 'amarillo', tipo: 'normal', numero: '1' },
  { id: 59, color: 'amarillo', tipo: 'normal', numero: '2' },
  { id: 60, color: 'amarillo', tipo: 'normal', numero: '3' },
  { id: 61, color: 'amarillo', tipo: 'normal', numero: '4' },
  { id: 62, color: 'amarillo', tipo: 'normal', numero: '5' },
  { id: 63, color: 'amarillo', tipo: 'normal', numero: '6' },
  { id: 64, color: 'amarillo', tipo: 'normal', numero: '7' },
  { id: 65, color: 'amarillo', tipo: 'normal', numero: '8' },
  { id: 66, color: 'amarillo', tipo: 'normal', numero: '9' },
  { id: 67, color: 'amarillo', tipo: 'normal', numero: '1' },
  { id: 68, color: 'amarillo', tipo: 'normal', numero: '2' },
  { id: 69, color: 'amarillo', tipo: 'normal', numero: '3' },
  { id: 70, color: 'amarillo', tipo: 'normal', numero: '4' },
  { id: 71, color: 'amarillo', tipo: 'normal', numero: '5' },
  { id: 72, color: 'amarillo', tipo: 'normal', numero: '6' },
  { id: 73, color: 'amarillo', tipo: 'normal', numero: '7' },
  { id: 74, color: 'amarillo', tipo: 'normal', numero: '8' },
  { id: 75, color: 'amarillo', tipo: 'normal', numero: '9' },

    // Cartas de acción (2 por color)
  // Reversa
  { id: 76, color: 'rojo', tipo: 'accion', numero: 'reversa' },
  { id: 77, color: 'rojo', tipo: 'accion', numero: 'reversa' },
  { id: 78, color: 'azul', tipo: 'accion', numero: 'reversa' },
  { id: 79, color: 'azul', tipo: 'accion', numero: 'reversa' },
  { id: 80, color: 'verde', tipo: 'accion', numero: 'reversa' },
  { id: 81, color: 'verde', tipo: 'accion', numero: 'reversa' },
  { id: 82, color: 'amarillo', tipo: 'accion', numero: 'reversa' },
  { id: 83, color: 'amarillo', tipo: 'accion', numero: 'reversa' },
  
  // Salto
  { id: 84, color: 'rojo', tipo: 'accion', numero: 'salto' },
  { id: 85, color: 'rojo', tipo: 'accion', numero: 'salto' },
  { id: 86, color: 'azul', tipo: 'accion', numero: 'salto' },
  { id: 87, color: 'azul', tipo: 'accion', numero: 'salto' },
  { id: 88, color: 'verde', tipo: 'accion', numero: 'salto' },
  { id: 89, color: 'verde', tipo: 'accion', numero: 'salto' },
  { id: 90, color: 'amarillo', tipo: 'accion', numero: 'salto' },
  { id: 91, color: 'amarillo', tipo: 'accion', numero: 'salto' },
  
  // Toma 2
  { id: 92, color: 'rojo', tipo: 'accion', numero: 'toma2' },
  { id: 93, color: 'rojo', tipo: 'accion', numero: 'toma2' },
  { id: 94, color: 'azul', tipo: 'accion', numero: 'toma2' },
  { id: 95, color: 'azul', tipo: 'accion', numero: 'toma2' },
  { id: 96, color: 'verde', tipo: 'accion', numero: 'toma2' },
  { id: 97, color: 'verde', tipo: 'accion', numero: 'toma2' },
  { id: 98, color: 'amarillo', tipo: 'accion', numero: 'toma2' },
  { id: 99, color: 'amarillo', tipo: 'accion', numero: 'toma2' },

    // Cartas especiales (4 por tipo)
  // Comodín
  { id: 100, color: 'negro', tipo: 'especial', numero: 'comodin' },
  { id: 101, color: 'negro', tipo: 'especial', numero: 'comodin' },
  { id: 102, color: 'negro', tipo: 'especial', numero: 'comodin' },
  { id: 103, color: 'negro', tipo: 'especial', numero: 'comodin' },
  
  // Toma 4
  { id: 104, color: 'negro', tipo: 'especial', numero: 'toma4' },
  { id: 105, color: 'negro', tipo: 'especial', numero: 'toma4' },
  { id: 106, color: 'negro', tipo: 'especial', numero: 'toma4' },
  { id: 107, color: 'negro', tipo: 'especial', numero: 'toma4' }
];

// Función para subir las cartas a Firestore
async function subirCartas() {
  try {
    // Crear un batch de escritura
    const batch = writeBatch(db);
    const cartasRef = collection(db, 'cartas');
    
    // Añadir todas las operaciones al batch
    cartasUNO.forEach(carta => {
      const docRef = doc(cartasRef, carta.id.toString());
      batch.set(docRef, {
        id: carta.id,
        color: carta.color,
        tipo: carta.tipo,
        numero: carta.numero
      });
    });

        // Ejecutar el batch
        await batch.commit();
        console.log('✅ Todas las cartas han sido subidas exitosamente a Firebase!');
      } 
      catch (error) {
        console.error('❌ Error al subir las cartas:', error);
      }
    }

// Ejecutar la función
subirCartas();