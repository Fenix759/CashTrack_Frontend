// import { createRouter, createWebHistory } from "vue-router";
// import Login from "../views/Login.vue";
// import Dashboard from "../views/Dashboard.vue";

// const routes = [
//   { path: "/", name: "Login", component: Login },
//   { path: "/dashboard", name: "Dashboard", component: Dashboard },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/Register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Proteger dashboard si no hay token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access')
  if (to.name === 'Dashboard' && !token) next({ name: 'Login' })
  else next()
})

export default router
