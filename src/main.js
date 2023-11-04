import { createApp } from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import store from "@/store";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(VueKonva);
app.use(vuetify);
app.use(store);
app.mount("#app");
