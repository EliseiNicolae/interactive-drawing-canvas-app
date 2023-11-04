<template>
  <div class="panel-buttons max-w-[450px] p-5">
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
};
</script>

<style scoped></style>
