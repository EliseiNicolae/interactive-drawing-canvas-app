import Vuex from "vuex";
import canvas from "@/store/modules/canvas";
import panel from "@/store/modules/panel";

export default new Vuex.Store({
  modules: {
    canvas,
    panel,
  },
});
