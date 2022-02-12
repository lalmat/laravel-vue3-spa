// Import vue-router
import { createRouter, createWebHashHistory } from 'vue-router'

// Import Vuex Store
import store from './store/index.js';

// Import Views-Components
import TheAdmin   from './views/TheAdmin.vue'
import TheSecure  from './views/TheSecure.vue'
import TheLogin   from './views/TheLogin.vue'

import TheError403   from './components/TheError403.vue'
import TheError404   from './components/TheError404.vue'

// Configure Router
export default createRouter({
  history: createWebHashHistory(),
  routes : [
    {
      path: '/login',
      component: TheLogin,
    },
    {
      path: "/admin",
      component: TheAdmin,
      beforeEnter: (to, from, next) => guard_admins(next),
    },
    {
      path: "/secure",
      component: TheSecure,
      beforeEnter: (to, from, next) => guard_users(next)
    },
    {
      path: "/error-403",
      component: TheError403
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/:pathMatch(.*)*',
      component: TheError404
    }
  ],
});


// ----------------------------------------------------------------------------
// Route Guards

/**
 * Cette fonction s'assure que l'utilisateur est connecté et qu'il est administrateur
 * @param {*} next
 */
async function guard_admins(next) {
  await guard_generic(() => (store.state.laravel.user != null && store.state.laravel.admin), next);
}


/** ---------------------------------------------------------------------------
 * Cette function s'assure que l'utilisateur est connecté
 * @param {*} next
 */
async function guard_users(next) {
  await guard_generic(() => (store.state.laravel.user != null && store.state.laravel.user.id > 0), next);
}

/** ---------------------------------------------------------------------------
 * Cette fonction execute la fonction "rule" pour savoir si l'utilisateur peut suivre ou non la route
 * @param {*} next
 */
async function guard_generic(rule, next) {
  // Règle d'autorisation
  let allowed = rule();

  // Gestion accès direct
  try {
    await store.dispatch('laravel/session');
    allowed = rule();
  }
  catch(e) { allowed = false }

  // Affichage ou redirection si nécessaire.
  next( allowed ? true : '/error-403' );
}
