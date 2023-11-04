<template>
  <div>
    <div class="canvas-container" v-if="this.currentLayout">
      <v-stage
        ref="stage"
        :width="this.currentLayout.width"
        :height="this.currentLayout.height"
        @mouseup="updateDataURL"
        @touchend="updateDataURL"
      >
        <v-layer>
          <component
            v-for="shapeObject in currentLayout.shapeObjects"
            :is="shapeObject.component_name"
            v-bind="shapeObject.props"
            :key="shapeObject.props.id"
            @dragmove="updateShapePosition"
            @click="selectShape"
          ></component>
        </v-layer>
      </v-stage>
    </div>
    <download-btn :data-url="this.currentLayout?.imageBase64"></download-btn>
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
      currentLayout: null,
    };
  },
  methods: {
    ...mapGetters({
      getCurrentLayout: "globalState/getCurrentLayout",
    }),
    updateDataURL() {
      if (this.$refs.stage) {
        this.currentLayout.imageBase64 =
          this.$refs.stage.getNode().toDataURL() || "";
      }
    },
    updateShapePosition(event, shapeObject) {
      console.log("Shape position updated:", shapeObject);
      // TODO: Update the shape position in Vuex
    },
    selectShape(shapeObject) {
      console.log("Shape selected:", shapeObject);
      //  TODO: Set selected shape in Vuex and populate the color and stroke size in the panel
    },
  },
  mounted() {
    this.currentLayout = this.getCurrentLayout();
    this.updateDataURL();
  },
};
</script>

<style scoped>
.canvas-container {
  width: 600px;
  height: 600px;
}
</style>
