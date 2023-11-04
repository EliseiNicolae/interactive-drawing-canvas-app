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
    ADD_NEW_SHAPE(state, data) {
      state.currentLayout.shapeObjects.push(data);
    },
  },
  actions: {
    addNewShape({ commit }, data) {
      commit("ADD_NEW_SHAPE", {
        component_name: data.component_name,
        props: {
          ...data.props,
          id: `${data.component_name}-${id()}`,
        },
      });
    },
  },
};
