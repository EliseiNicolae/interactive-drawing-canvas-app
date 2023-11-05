<template>
  <div
    v-if="cursorType === 'crosshair'"
    class="position-relative mt-[85px] p-5 border border-2 shadow-md"
  >
    <div
      class="position-absolute right-3 top-3 cursor-pointer"
      @click="onClose"
    >
      <v-icon icon="mdi-close-thick"></v-icon>
    </div>
    <h3 class="font-bold text-2xl mb-3">Brush Settings</h3>
    <div>
      Stroke Color
      <br />
      <input v-model="brushColor" type="color" />
    </div>

    <div class="mt-3">
      Stroke Size
      <br />
      <v-slider
        v-model="brushWidth"
        :messages="`Width: ${brushWidth ? brushWidth.toFixed(1) : '0.0'}`"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BrushSettings",
  computed: {
    ...mapGetters({
      cursorType: "panel/getCursorType",
    }),
    brushColor: {
      get() {
        return this.$store.getters["panel/getBrushColor"];
      },
      set(newVal) {
        this.$store.dispatch("panel/setBrushColor", newVal);
      },
    },
    brushWidth: {
      get() {
        return this.$store.getters["panel/getBrushWidth"];
      },
      set(newVal) {
        this.$store.dispatch("panel/setBrushWidth", newVal);
      },
    },
  },
  methods: {
    onClose() {
      this.$store.dispatch("panel/setCursorType", "default");
    },
  },
};
</script>

<style scoped></style>