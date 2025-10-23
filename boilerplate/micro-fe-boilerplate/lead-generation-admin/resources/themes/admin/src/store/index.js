import Vue from 'vue';
import Vuex from 'vuex';
import cancelRequestStore from './cancelRequestStore';
import builderStore from './builderStore';
import authStore from './authStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cancelRequest: cancelRequestStore,
    auth: authStore,
    builder: builderStore,
  },
});
