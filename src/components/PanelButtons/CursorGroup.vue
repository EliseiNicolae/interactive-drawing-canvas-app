<template>
  <div class="my-3">
    Freehand Drawing
    <br />
    <v-btn-toggle
      v-model="cursorType"
      rounded="0"
      color="deep-purple-accent-3"
      group
      mandatory
    >
      <v-btn :value="CURSOR_TYPE.DEFAULT">
        <v-icon icon="mdi-cursor-default"></v-icon>
      </v-btn>
      <v-btn :value="CURSOR_TYPE.GRAB">
        <v-icon icon="mdi-drag"></v-icon>
      </v-btn>
      <v-btn :value="CURSOR_TYPE.CROSSHAIR">
        <v-icon icon="mdi-pencil"></v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import { CURSOR_TYPE } from "@/constants/constants";

export default {
  name: "CursorGroup",
  computed: {
    CURSOR_TYPE() {
      return CURSOR_TYPE;
    },
    cursorType: {
      get() {
        return this.$store.getters["panel/getCursorType"];
      },
      set(newVal) {
        this.$store.dispatch("panel/setCursorType", newVal);
      },
    },
  },
  watch: {
    cursorType(newVal) {
      switch (newVal) {
        case CURSOR_TYPE.GRAB:
          this.$store.dispatch("canvas/setDraggable", true);
          break;
        case CURSOR_TYPE.CROSSHAIR:
          this.$store.dispatch("canvas/setDraggable", false);
          break;
        default:
        case CURSOR_TYPE.DEFAULT:
          this.$store.dispatch("canvas/setDraggable", false);
          break;
      }
      document.body.style.cursor = newVal;
      this.$store.dispatch("canvas/setSelectedShape", null);
      this.$store.dispatch("panel/setCursorType", newVal);
    },
  },
};
</script>

<style scoped></style>
