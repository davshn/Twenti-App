import Vue from 'vue';
import Vuex from 'vuex';
import session from './modules/session';
import general from './modules/general';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({ storage: window.localStorage })],
  modules: {
      session: session,
      general: general
  }
});
