import { uuid } from "@/utils/uuid";

export default {
  namespaced: true,
  state: {
    currentLayout: {
      id: `layout-${uuid()}`,
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
    SET_DRAGGABLE(state, data) {
      state.currentLayout.shapeObjects.map((shape) => {
        shape.props.draggable = data;
      });
    },
  },
  actions: {
    addNewShape({ commit }, data) {
      commit("ADD_NEW_SHAPE", {
        component_name: data.component_name,
        props: {
          id: data.props.id
            ? data.props.id
            : `${data.component_name}-${uuid()}`,
          ...data.props,
        },
      });
    },
    editShape({ commit }, data) {
      commit("EDIT_SHAPE", data);
    },
    setDraggable({ commit }, data) {
      commit("SET_DRAGGABLE", data);
    },
  },
};
