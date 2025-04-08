import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Vue3Toastify from "vue3-toastify";
// import "vue3-toastify/dist/index.css";

const routes = [
  { path: "/", component: () => import("./components/Home.vue") },
  { path: "/register", component: () => import("./components/Register.vue") },
  { path: "/login", component: () => import("./components/Login.vue") },
  { path: "/lobby", component: () => import("./components/Lobby.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

// app.use(Vue3Toastify, {
//   autoClose: 3000,
//   position: "top-center",
// });

app.mount("#app");
