<template>
  <div>
    <div
      class="border border-red-500 border-2 shadow-md mb-4"
      v-if="this.currentLayout"
    >
      <v-stage
        ref="stage"
        :config="{
          width: currentLayout.width,
          height: currentLayout.height,
        }"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @touchend="updateDataURL"
      >
        <v-layer>
          <v-rect
            :config="{
              width: currentLayout.width,
              height: currentLayout.height,
              fill: 'white',
            }"
          />
          <component
            v-for="shapeObject in currentLayout.shapeObjects"
            :is="shapeObject.component_name"
            v-bind="shapeObject.props"
            :key="shapeObject.props.id"
            @dragstart="selectShape(shapeObject)"
            @click="selectShape(shapeObject)"
            @dragend="updateElementPosition($event, shapeObject)"
          />
        </v-layer>
      </v-stage>
    </div>
    <div class="flex justify-between">
      <download-btn :data-url="this.currentLayout?.imageBase64" />
      <undo-redo-buttons />
    </div>
  </div>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import { mapGetters } from "vuex";
import { uuid } from "@/utils/uuid";
import UndoRedoButtons from "@/components/UndoRedoButtons.vue";

export default {
  name: "DrawableCanvas",
  components: { UndoRedoButtons, DownloadBtn },
  data() {
    return {
      isDrawing: false,
      currentDrawingLines: null,
    };
  },
  computed: {
    ...mapGetters({
      currentLayout: "canvas/getCurrentLayout",
      cursorType: "panel/getCursorType",
      brushColor: "panel/getBrushColor",
      brushWidth: "panel/getBrushWidth",
    }),
  },
  methods: {
    updateDataURL() {
      if (this.$refs.stage) {
        this.currentLayout.imageBase64 =
          this.$refs.stage.getNode().toDataURL() || "";
      }
    },
    updateElementPosition(event, shapeObject) {
      this.$store.dispatch("canvas/editShape", {
        component_name: shapeObject.props.component_name,
        props: {
          ...shapeObject.props,
          x: event.target.x(),
          y: event.target.y(),
        },
      });
      this.$store.dispatch("canvas/addInHistory");
      this.updateDataURL();
    },
    selectShape(shapeObject) {
      this.$store.dispatch("canvas/setSelectedShape", shapeObject);
    },
    handleMouseDown(e) {
      this.isDrawing = this.cursorType === "crosshair";
      if (!this.isDrawing) {
        return;
      }
      const pos = e.target.getStage().getPointerPosition();
      this.currentDrawingLines = {
        id: `v-line-${uuid()}`,
        tool: "pen",
        points: [pos.x, pos.y],
      };
      this.$store.dispatch("canvas/addNewShape", {
        component_name: "v-line",
        props: {
          id: this.currentDrawingLines.id,
          points: [],
          stroke: this.brushColor,
          strokeWidth: this.brushWidth,
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

      this.$store.dispatch("canvas/editShape", {
        component_name: "v-line",
        props: {
          id: this.currentDrawingLines.id,
          points: [...this.currentDrawingLines.points],
        },
      });
    },
    handleMouseUp() {
      if (this.isDrawing) {
        this.$store.dispatch("canvas/addInHistory");
        this.isDrawing = false;
      }
    },
  },
  mounted() {
    this.updateDataURL();
  },
};
</script>

<style scoped></style>