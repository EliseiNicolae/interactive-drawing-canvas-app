<template>
  <div>
    <div class="canvas-container">
      <v-stage
        ref="stage"
        :config="configKonva"
        @mouseup="updateDataURL"
        @touchend="updateDataURL"
      >
        <v-layer>
          <v-circle :config="configCircle"></v-circle>
        </v-layer>
      </v-stage>
    </div>
    <download-btn :data-url="canvasURL"></download-btn>
  </div>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import { mapGetters } from "vuex";

export default {
  name: "DrawableCanvas",
  components: { DownloadBtn },
  data() {
    return {
      configKonva: {
        width: 600,
        height: 600,
        fill: "red",
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
        draggable: true,
      },
      canvasURL: null,
    };
  },
  methods: {
    ...mapGetters({
      getText: "globalState/getText",
    }),
    updateDataURL() {
      if (this.$refs.stage) {
        this.canvasURL = this.$refs.stage.getNode().toDataURL();
      }
    },
  },
  mounted() {
    this.updateDataURL();
    console.log("getText", this.getText());
  },
};
</script>

<style scoped>
.canvas-container {
  width: 600px;
  height: 600px;
}
</style>
