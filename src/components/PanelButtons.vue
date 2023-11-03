<template>
  <div class="panel-buttons min-[100px] p-5">
    <h3 class="font-bold text-2xl">Panel buttons</h3>
    <div class="my-3">
      Shape drawing
      <br />
      <div class="flex gap-2">
        <v-btn variant="outlined"> circle</v-btn>
        <v-btn variant="outlined"> square</v-btn>
        <v-btn variant="outlined"> triangle</v-btn>
      </div>
    </div>

    <div class="my-3">
      Freehand Drawing
      <br />
      <div class="flex gap-2">
        <v-btn variant="outlined"> line</v-btn>
      </div>
    </div>

    <div class="my-3">
      Color Picker
      <br />
      <input v-model="color" type="color" />
      <div style="margin-top: 20px">Selected color: {{ color }}</div>
    </div>

    <div class="my-3">
      Brush Size
      <br />
      <v-slider />
    </div>

    <v-btn color="success">Save</v-btn>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "PanelButtons",
  components: {},
  setup() {
    const color = ref("#FF0000"); // Default color red

    // You can also respond to color changes:
    const updateColor = (newColor) => {
      // Perform any action with the new color
      console.log("Color selected:", newColor);
    };

    // Watch for changes
    watch(color, (newColor) => {
      updateColor(newColor);
    });

    return { color };
  },
};
</script>

<style scoped></style>
