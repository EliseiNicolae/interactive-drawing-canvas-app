<template>
  <div class="my-3">
    Freehand Drawing
    <br />
    <v-btn-toggle
      v-model="cursor"
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
  data() {
    return {
      cursor: "default",
    };
  },
  watch: {
    cursor(newVal) {
      switch (newVal) {
        case "grab":
          this.$store.dispatch("canvas/setDraggable", true);
          document.body.style.cursor = "grab";
          break;
        case "crosshair":
          this.$store.dispatch("canvas/setDraggable", false);
          document.body.style.cursor = "crosshair";
          break;
        default:
        case "default":
          this.$store.dispatch("canvas/setDraggable", false);
          document.body.style.cursor = "default";
          break;
      }
      this.$store.dispatch("canvas/setSelectedShape", null);
      this.$store.dispatch("panelButtons/setCursorType", newVal);
    },
  },
};
</script>

<style scoped></style>