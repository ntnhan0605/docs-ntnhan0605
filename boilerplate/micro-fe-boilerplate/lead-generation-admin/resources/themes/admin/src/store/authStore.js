export const AUTH_STORE = {
  STATE: {
    isLogin: 'isLogin',
    permission: 'permission',
  },
  MUTATIONS: {
    SET_DATA: 'SET_DATA',
  },
  ACTIONS: {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
  },
};

// auth
const authStore = {
  namespaced: true,
  state: {
    userData: {},
    isLogin: null,
    permission: null,
  },
  mutations: {
    [AUTH_STORE.MUTATIONS.SET_DATA](state, payload) {
      if (payload.key) {
        state[payload.key] = payload.value;
      }
    },
  },
  actions: {
    async [AUTH_STORE.ACTIONS.LOGIN]({ commit }) {
      try {
        // TODO:
        commit(AUTH_STORE.MUTATIONS.SET_DATA, { key: AUTH_STORE.STATE.isLogin, value: true });
      } catch (error) {
        console.error(error);
      }
    },
    async [AUTH_STORE.ACTIONS.LOGOUT]({ commit }) {
      try {
        commit(AUTH_STORE.MUTATIONS.SET_DATA, { key: AUTH_STORE.STATE.isLogin, value: false });
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default authStore;
