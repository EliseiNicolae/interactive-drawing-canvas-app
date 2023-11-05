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
      <v-btn value="default">
        <v-icon icon="mdi-cursor-default"></v-icon>
      </v-btn>
      <v-btn value="grab">
        <v-icon icon="mdi-drag"></v-icon>
      </v-btn>
      <v-btn value="crosshair">
        <v-icon icon="mdi-pencil"></v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "CursorGroup",
  computed: {
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
        case "grab":
          this.$store.dispatch("canvas/setDraggable", true);
          break;
        case "crosshair":
          this.$store.dispatch("canvas/setDraggable", false);
          break;
        default:
        case "default":
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