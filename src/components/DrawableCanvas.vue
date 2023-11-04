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
    <div class="flex justify-between">
      <download-btn :data-url="this.currentLayout?.imageBase64" />
      <undo-redo-buttons :data-url="this.currentLayout?.imageBase64" />
    </div>
  </div>
</template>

<script>
import DownloadBtn from "@/components/DownloadBtn.vue";
import { mapGetters } from "vuex";
import { DEFAULT_VALUES } from "@/constants/constants";
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
      cursorType: "panelButtons/getCursorType",
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
          addInHistory: true,
          x: event.target.x(),
          y: event.target.y(),
        },
      });
      this.selectShape(shapeObject);
      this.updateDataURL();
    },
    selectShape(shapeObject) {
      this.currentLayout.selectedShape = shapeObject;
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
        this.$store.dispatch("canvas/editShape", {
          props: {
            id: this.currentDrawingLines.id,
            addInHistory: true,
          },
        });
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