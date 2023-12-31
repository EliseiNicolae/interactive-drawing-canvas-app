export default {
  namespaced: true,
  state: {
    currentLayout: {
      id: `layout`,
      width: window.innerWidth,
      height: window.innerHeight,
      selectedShape: null,
      shapeObjects: [],
      imageBase64: "",
    },
    historyLayouts: [
      {
        id: `layout`,
        width: window.innerWidth,
        height: window.innerHeight,
        selectedShape: null,
        shapeObjects: [],
        imageBase64: "",
      },
    ],
    historyIndex: 0,
  },
  getters: {
    getCurrentLayout: (state) => state.currentLayout,
    getHistoryLayouts: (state) => state.historyLayouts,
    getHistoryIndex: (state) => state.historyIndex,
  },
  mutations: {
    ADD_NEW_SHAPE(state, data) {
      state.currentLayout.shapeObjects.push(data);
    },
    EDIT_SHAPE(state, data) {
      const shape = state.currentLayout.shapeObjects.find(
        (shape) => shape.props.id === data.props.id,
      );
      if (shape) {
        shape.props = { ...shape.props, ...data.props };
      }
    },
    SET_DRAGGABLE(state, data) {
      state.currentLayout.shapeObjects.map((shape) => {
        shape.props.draggable = data;
      });
    },
    SET_SELECTED_SHAPE(state, data) {
      state.currentLayout.selectedShape = data;
    },
    ADD_IN_HISTORY(state) {
      // Create a deep copy of state.currentLayout
      const currentLayoutCopy = JSON.parse(JSON.stringify(state.currentLayout));
      currentLayoutCopy.selectedShape = null;
      // Now push the copy to the history, ensuring no references are kept
      state.historyLayouts.push(currentLayoutCopy);
      state.historyIndex = state.historyLayouts.length - 1;
    },
    UNDO(state) {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        // Deep copy the layout from history
        state.currentLayout = JSON.parse(
          JSON.stringify(state.historyLayouts[state.historyIndex]),
        );
      }
    },
    REDO(state) {
      if (state.historyIndex < state.historyLayouts.length - 1) {
        state.historyIndex++;
        // Deep copy the layout from history
        state.currentLayout = JSON.parse(
          JSON.stringify(state.historyLayouts[state.historyIndex]),
        );
      }
    },
  },
  actions: {
    async addNewShape({ commit }, data) {
      await commit("ADD_NEW_SHAPE", data);
    },
    editShape({ commit }, data) {
      commit("EDIT_SHAPE", data);
    },
    addInHistory({ commit }) {
      commit("ADD_IN_HISTORY");
    },
    setDraggable({ commit }, data) {
      commit("SET_DRAGGABLE", data);
    },
    setSelectedShape({ commit }, data) {
      commit("SET_SELECTED_SHAPE", data);
    },
    undo({ commit }) {
      commit("UNDO");
    },
    redo({ commit }) {
      commit("REDO");
    },
  },
};
