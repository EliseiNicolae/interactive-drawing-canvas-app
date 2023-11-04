<template>
  <div class="panel-buttons max-w-[450px] p-5">
    <h3 class="font-bold text-2xl">Panel buttons</h3>
    <div class="my-3">
      Shape drawing
      <br />
      <div class="flex gap-2">
        <v-btn variant="outlined" @click="addShapeInCanvas(V_CIRCLE)">
          <v-icon icon="mdi-circle-outline"></v-icon>
        </v-btn>
        <v-btn variant="outlined" @click="addShapeInCanvas(V_RECT)">
          <v-icon icon="mdi-square-outline"></v-icon>
        </v-btn>
        <v-btn variant="outlined" @click="addShapeInCanvas(V_REGULAR_POLYGON)">
          <v-icon icon="mdi-triangle-outline"></v-icon>
        </v-btn>
      </div>
    </div>

    <div class="my-3">
      Freehand Drawing
      <br />
      <v-btn-toggle
        v-model="text"
        rounded="0"
        color="deep-purple-accent-3"
        group
        mandatory
      >
        <v-btn value="pointer">
          <v-icon icon="mdi-cursor-default"></v-icon>
        </v-btn>
        <v-btn value="draggable">
          <v-icon icon="mdi-drag"></v-icon>
        </v-btn>
        <v-btn value="freehand">
          <v-icon icon="mdi-pencil"></v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <div class="mb-3 mt-20" v-if="this.currentLayout?.selectedShape">
      Color Picker
      <br />
      <input v-model="color" type="color" />
      <div style="margin-top: 20px">Selected color: {{ color }}</div>
    </div>

    <div class="my-3" v-if="this.currentLayout?.selectedShape">
      Brush Size
      <br />
      <v-slider v-model="strokeWidth" />
    </div>
  </div>
</template>

<script>
import {
  DEFAULT_VALUES,
  V_CIRCLE,
  V_RECT,
  V_REGULAR_POLYGON,
} from "@/constants/constants";
import { mapGetters } from "vuex";

export default {
  name: "PanelButtons",
  computed: {
    V_RECT() {
      return V_RECT;
    },
    V_REGULAR_POLYGON() {
      return V_REGULAR_POLYGON;
    },
    V_CIRCLE() {
      return V_CIRCLE;
    },
  },
  data() {
    return {
      currentLayout: null,
      color: DEFAULT_VALUES.strokeColor,
      strokeWidth: DEFAULT_VALUES.strokeWidth,
      text: "pointer",
    };
  },
  watch: {
    color(newVal) {
      this.currentLayout.selectedShape.props.stroke = newVal;
      console.log("Color changed:", newVal);
    },
    strokeWidth(newVal) {
      this.currentLayout.selectedShape.props.strokeWidth = newVal;
    },
    currentLayout: {
      handler(newVal) {
        if (!newVal?.selectedShape) return;

        this.color = newVal.selectedShape.props.stroke;
        this.strokeWidth = newVal.selectedShape.props.strokeWidth;
      },
      deep: true,
    },
  },
  methods: {
    ...mapGetters({
      getCurrentLayout: "globalState/getCurrentLayout",
    }),
    addShapeInCanvas(component_name) {
      this.$store.dispatch("globalState/addNewShape", component_name);
    },
  },
  mounted() {
    this.currentLayout = this.getCurrentLayout();
  },
};
</script>

<style scoped></style>