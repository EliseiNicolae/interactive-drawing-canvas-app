export default {
  namespaced: true,
  state: {
    text: "test",
  },
  getters: {
    getText: (state) => {
      return state.text;
    },
  },
  mutations: {
    SET_TEXT(state, data) {
      state.text = data;
    },
  },
  actions: {
    setText({ commit }, data) {
      commit("SET_TEXT", data);
    },
    getText({ commit }) {
      commit("GET_TEXT");
    },
  },
};
