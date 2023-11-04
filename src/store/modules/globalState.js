function id() {
  return Math.round(Math.random() * 10000);
}

export default {
  namespaced: true,
  state: {
    currentLayout: {
      id: `layout-${id()}`,
      width: 600,
      height: 600,
      selectedShape: null,
      shapeObjects: [],
      imageBase64: "",
    },
    historyLayouts: [],
  },
  getters: {
    getCurrentLayout: (state) => state.currentLayout,
  },
  mutations: {
    SET_TEXT(state, data) {
      state.text = data;
    },
    ADD_NEW_SHAPE(state, data) {
      state.currentLayout.shapeObjects.push(data);
    },
  },
  actions: {
    setText({ commit }, data) {
      commit("SET_TEXT", data);
    },
    addNewShape({ commit }, data) {
      commit("ADD_NEW_SHAPE", data);
    },
  },
};
