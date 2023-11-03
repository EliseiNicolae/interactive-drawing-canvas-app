<template>
  <div class="canvas-container">
    <v-stage :config="configKonva">
      <v-layer>
        <v-circle :config="configCircle"></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  name: "DrawableCanvas",
  data() {
    return {
      configKonva: {
        width: 200,
        height: 200,
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
      },
    };
  },
};
</script>

<style scoped>
.canvas-container {
  background: blue;
  width: 600px;
  height: 600px;
}
</style>
