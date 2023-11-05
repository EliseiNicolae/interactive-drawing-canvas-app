import { DEFAULT_VALUES } from "@/constants/constants";

export default {
  namespaced: true,
  state: {
    cursorType: "default", // default, grab, crosshair
    brushColor: DEFAULT_VALUES.strokeColor,
    brushWidth: DEFAULT_VALUES.strokeWidth,
  },
  getters: {
    getCursorType: (state) => state.cursorType,
    getBrushColor: (state) => state.brushColor,
    getBrushWidth: (state) => state.brushWidth,
  },
  mutations: {
    SET_CURSOR_TYPE(state, cursorType) {
      state.cursorType = cursorType;
    },
    SET_BRUSH_COLOR(state, brushColor) {
      state.brushColor = brushColor;
    },
    SET_BRUSH_WIDTH(state, brushWidth) {
      state.brushWidth = brushWidth;
    },
  },
  actions: {
    setCursorType({ commit }, cursorType) {
      commit("SET_CURSOR_TYPE", cursorType);
    },
    setBrushColor({ commit }, brushColor) {
      commit("SET_BRUSH_COLOR", brushColor);
    },
    setBrushWidth({ commit }, brushWidth) {
      commit("SET_BRUSH_WIDTH", brushWidth);
    },
  },
};
