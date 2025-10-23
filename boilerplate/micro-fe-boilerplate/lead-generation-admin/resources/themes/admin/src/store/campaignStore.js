// TODO: Optimize store

const campaignStore = {
  namespaced: true,
  state: {
    test: 'campaignStore',
  },
  mutations: {
    SET_DATA(state, payload = { key: 'test', data: {} }) {
      state[key] = payload.data;
    },
    REMOVE_DATA(state, payload = { key: 'test', data: '' }) {
      state[key] = undefined;
    },
  },
  actions: {},
};
export default campaignStore;
