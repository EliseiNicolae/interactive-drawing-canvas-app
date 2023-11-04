import Vuex from "vuex";
import canvas from "@/store/modules/canvas";
import panelButtons from "@/store/modules/panelButtons";

export default new Vuex.Store({
  modules: {
    canvas,
    panelButtons,
  },
});
