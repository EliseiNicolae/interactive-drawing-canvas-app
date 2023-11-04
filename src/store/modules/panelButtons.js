export default {
  namespaced: true,
  state: {
    cursorType: "default", // default, grab, crosshair
  },
  getters: {
    getCursorType: (state) => state.cursorType,
  },
  mutations: {
    SET_CURSOR_TYPE(state, cursorType) {
      state.cursorType = cursorType;
    },
  },
  actions: {
    setCursorType({ commit }, cursorType) {
      commit("SET_CURSOR_TYPE", cursorType);
    },
  },
};
