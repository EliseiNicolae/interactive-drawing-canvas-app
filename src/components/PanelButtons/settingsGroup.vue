<template>
  <div
    v-if="this.currentLayout?.selectedShape"
    class="position-relative mb-3 mt-20 p-5 border border-red-500 border-2 shadow-md mb-4"
  >
    <div
      class="position-absolute right-3 top-3 cursor-pointer"
      @click="onClose"
    >
      <v-icon icon="mdi-close-thick"></v-icon>
    </div>
    <h3 class="font-bold text-2xl mb-3">Edit</h3>
    <div>
      Color Picker
      <br />
      <input v-model="color" type="color" />
      <div style="margin-top: 20px">Selected color: {{ color }}</div>
    </div>

    <div class="mt-3">
      Brush Size
      <br />
      <v-slider
        v-model="strokeWidth"
        :messages="`strokeWidth${strokeWidth ? strokeWidth.toFixed(1) : '0.0'}`"
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
  name: "SettingsGroup",
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
    onClose() {
      this.$store.dispatch("canvas/setSelectedShape", null);
    },
  },
};
</script>

<style scoped></style>