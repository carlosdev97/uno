import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';

// Importar componentes
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CreateGame from '../components/CreateGame.vue';
import JoinGame from '../components/JoinGame.vue';
import Partida from '../components/Partida.vue';

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/home', name: 'home', component: Home, /*meta: { requiresAuth: true }*/ },
  { path: '/create-game', name: 'create-game', component: CreateGame, /*meta: { requiresAuth: true }*/ },
  { path: '/join-game', name: 'join-game', component: JoinGame, /*meta: { requiresAuth: true }*/ },
  { path: '/partida/:codigo', name: 'partida', component: Partida, /*meta: { requiresAuth: true }*/ },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser; 

  if (requiresAuth && !user) {
    console.log("Acceso denegado. Redirigiendo a /");
    next('/');
  } else {
    next();
  }
});

export default router;
