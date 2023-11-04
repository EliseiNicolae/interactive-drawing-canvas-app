<template>
  <div class="flex gap-5 mt-5">
    <panel-buttons />
    <drawable-canvas />
  </div>
</template>

<script>
import DrawableCanvas from "./components/DrawableCanvas.vue";
import PanelButtons from "@/components/PanelButtons/index.vue";

export default {
  name: "App",
  components: {
    PanelButtons,
    DrawableCanvas,
  },
};
</script>

<style src="./assets/tailwind.css"></style>
