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
            @dragend="updateShapePosition($event, shapeObject)"
            @click="selectShape(shapeObject)"
          />
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
      shapeObject.props.x = event.target.x();
      shapeObject.props.y = event.target.y();
      this.selectShape(shapeObject);
      this.updateDataURL();
    },
    selectShape(shapeObject) {
      this.currentLayout.selectedShape = shapeObject;
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