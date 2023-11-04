<template>
  <div>
    <div
      class="border border-red-500 border-2 shadow-md mb-4"
      v-if="this.currentLayout"
    >
      <v-stage
        ref="stage"
        :width="this.currentLayout.width"
        :height="this.currentLayout.height"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @touchend="updateDataURL"
      >
        <v-layer>
          <component
            v-for="shapeObject in currentLayout.shapeObjects"
            :is="shapeObject.component_name"
            v-bind="shapeObject.props"
            :key="shapeObject.props.id"
            @dragend="updateElementPosition($event, shapeObject)"
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
import { DEFAULT_VALUES } from "@/constants/constants";
import { id } from "@/store/modules/globalState";

export default {
  name: "DrawableCanvas",
  components: { DownloadBtn },
  data() {
    return {
      currentLayout: null,
      isDrawing: false,
      currentDrawingLines: null,
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
    updateElementPosition(event, shapeObject) {
      shapeObject.props.x = event.target.x();
      shapeObject.props.y = event.target.y();
      this.selectShape(shapeObject);
      this.updateDataURL();
    },
    selectShape(shapeObject) {
      this.currentLayout.selectedShape = shapeObject;
    },
    handleMouseDown(e) {
      this.isDrawing = true;
      const pos = e.target.getStage().getPointerPosition();
      this.currentDrawingLines = {
        id: `v-line-${id()}`,
        tool: "pen",
        points: [pos.x, pos.y],
      };
      this.$store.dispatch("globalState/addNewShape", {
        component_name: "v-line",
        props: {
          id: this.currentDrawingLines.id,
          points: [],
          stroke: DEFAULT_VALUES.strokeColor,
          strokeWidth: 4,
          tension: 0.001,
        },
      });
    },
    handleMouseMove(e) {
      if (!this.isDrawing) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      this.currentDrawingLines.points.push(point.x, point.y);

      this.$store.dispatch("globalState/editShape", {
        component_name: "v-line",
        props: {
          id: this.currentDrawingLines.id,
          points: [...this.currentDrawingLines.points],
        },
      });
    },
    handleMouseUp() {
      this.isDrawing = false;
    },
  },
  mounted() {
    this.currentLayout = this.getCurrentLayout();
    this.updateDataURL();
  },
};
</script>

<style scoped></style>