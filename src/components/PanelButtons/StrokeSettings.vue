<template>
  <div
    v-if="this.currentLayout?.selectedShape"
    class="position-relative mt-[85px] p-5 border border-2 shadow-md"
  >
    <div
      class="position-absolute right-3 top-3 cursor-pointer"
      @click="onClose"
    >
      <v-icon icon="mdi-close-thick"></v-icon>
    </div>
    <h3 class="font-bold text-2xl mb-3">Edit</h3>
    <div>
      Stroke Color
      <br />
      <input v-model="color" @change="onColorSelected" type="color" />
    </div>

    <div class="mt-3">
      Stroke Size
      <br />
      <v-slider
        v-model="strokeWidth"
        @end="onStrokeWidthSelected"
        :messages="`Width: ${strokeWidth ? strokeWidth.toFixed(1) : '0.0'}`"
      />
    </div>
    <p class="text-[10px] max-w-[200px] truncate text-gray-500 ml-auto mt-6">
      {{ this.currentLayout.selectedShape.props.id }}
    </p>
  </div>
</template>

<script>
import { DEFAULT_VALUES } from "@/constants/constants";
import { mapGetters } from "vuex";

export default {
  name: "StrokeSettings",
  data() {
    return {
      color: DEFAULT_VALUES.strokeColor,
      strokeWidth: DEFAULT_VALUES.strokeWidth,
    };
  },
  computed: {
    ...mapGetters({
      currentLayout: "canvas/getCurrentLayout",
    }),
  },
  watch: {
    color(newVal) {
      this.$store.dispatch("canvas/editShape", {
        component_name: this.currentLayout.selectedShape.component_name,
        props: {
          ...this.currentLayout.selectedShape.props,
          stroke: newVal,
        },
      });
    },
    strokeWidth(newVal) {
      this.$store.dispatch("canvas/editShape", {
        component_name: this.currentLayout.selectedShape.component_name,
        props: {
          ...this.currentLayout.selectedShape.props,
          strokeWidth: newVal,
        },
      });
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
    onClose() {
      this.$store.dispatch("canvas/setSelectedShape", null);
    },
    onColorSelected() {
      this.$store.dispatch("canvas/addInHistory");
    },
    onStrokeWidthSelected() {
      this.$store.dispatch("canvas/addInHistory");
    },
  },
};
</script>

<style scoped></style>
