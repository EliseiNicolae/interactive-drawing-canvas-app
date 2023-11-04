export function id() {
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
    EDIT_SHAPE(state, data) {
      const shape = state.currentLayout.shapeObjects.find(
        (shape) => shape.props.id === data.props.id,
      );
      shape.props = { ...shape.props, ...data.props };
    },
  },
  actions: {
    addNewShape({ commit }, data) {
      commit("ADD_NEW_SHAPE", {
        component_name: data.component_name,
        props: {
          id: data.id ? data.id : `${data.component_name}-${id()}`,
          ...data.props,
        },
      });
    },
    editShape({ commit }, data) {
      commit("EDIT_SHAPE", data);
    },
  },
};
