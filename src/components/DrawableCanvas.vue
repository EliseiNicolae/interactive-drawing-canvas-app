<template>
  <div class="p-5">
    <div
      class="border border-red-500 border-2 shadow-md mb-4"
      v-if="this.currentLayout"
    >
      <v-stage
        ref="stage"
        :config="{ width: stageWidth, height: stageHeight }"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @touchstart="handleMouseDown"
        @touchmove="handleMouseMove"
        @touchend="handleMouseUp"
      >
        <v-layer>
          <v-rect
            :config="{
              width: stageWidth,
              height: stageHeight,
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
            @dragend="onStopDragging($event, shapeObject)"
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
import { CURSOR_TYPE } from "@/constants/constants";

export default {
  name: "DrawableCanvas",
  components: { UndoRedoButtons, DownloadBtn },
  data() {
    return {
      isDrawing: false,
      currentDrawingLines: null,
      stageWidth: 0,
      stageHeight: 0,
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
  mounted() {
    this.updateStageSize();
    window.addEventListener("resize", this.updateStageSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.updateStageSize);
  },
  watch: {
    currentLayout: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.stage) {
            const stage = this.$refs.stage.getStage();
            stage.batchDraw();
            stage.toDataURL({
              callback: (dataUrl) => {
                this.currentLayout.imageBase64 = dataUrl;
              },
            });
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    updateStageSize() {
      const isMobile = window.innerWidth < 768;
      this.stageWidth = isMobile
        ? window.innerWidth - 42
        : window.innerWidth - 450;
      this.stageHeight = 550;
    },
    selectShape(shapeObject) {
      this.$store.dispatch("canvas/setSelectedShape", shapeObject);
    },
    handleMouseDown(e) {
      this.isDrawing = this.cursorType === CURSOR_TYPE.CROSSHAIR;
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
    onStopDragging(event, shapeObject) {
      this.$store.dispatch("canvas/editShape", {
        component_name: shapeObject.props.component_name,
        props: {
          ...shapeObject.props,
          x: event.target.x(),
          y: event.target.y(),
        },
      });
      this.$store.dispatch("canvas/addInHistory");
    },
  },
};
</script>

<style scoped></style>
