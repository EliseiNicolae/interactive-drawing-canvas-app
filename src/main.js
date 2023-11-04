import { createApp } from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import store from "@/store";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

app.use(VueKonva);
app.use(vuetify);
app.use(store);
app.mount("#app");
