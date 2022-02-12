import { createStore } from "vuex";

import laravel from './modules/laravel.js';

export default createStore({
  modules: {
    laravel,
  }
});
