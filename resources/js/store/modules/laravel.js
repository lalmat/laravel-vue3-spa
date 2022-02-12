import fetchLaravel from "../../fetchLaravel";

export default {
  namespaced: true,

  /** ****************************************************************************************** */
  state: {
    admin     : false,
    token     : null,
    user      : null,
    APP_ENV   : 'production',
    APP_NAME  : 'Laravel',
    APP_DEBUG : false
  },

  /** ****************************************************************************************** */
  actions: {
    async login({commit}, data) {
      let response = await fetchLaravel.post('api/login', data);
      commit('login_succeed', response);
      return response;
    },

    async session({commit}) {
      let response = await fetchLaravel.get('api/session');
      commit('session_succeed', response);
      return response;
    },

    async user() {
      return await fetchLaravel.get('api/user');
    },

    async logout({commit}) {
      await fetchLaravel.get('api/logout');
      commit('logout_succeed');
    }

  },

  /** ****************************************************************************************** */
  mutations: {
    login_succeed(state, data) {
      state.token = data.token;
      localStorage.setItem('_laravelToken', btoa(state.token));
    },

    session_succeed(state, data) {
      state.token      = atob(localStorage.getItem('_laravelToken'));
      state.user       = data.user;
      state.APP_ENV    = data.APP_ENV;
      state.APP_NAME   = data.APP_NAME;
      state.APP_DEBUG  = data.APP_DEBUG;
    },

    logout_succeed(state) {
      localStorage.removeItem('_laravelToken');
      state.token      = null;
      state.user       = null;
      state.APP_ENV    = 'production';
      state.APP_NAME   = 'Laravel';
      state.APP_DEBUG  = false;
    }
  }
}
