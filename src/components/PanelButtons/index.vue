<template>
  <div class="max-w-[300px] w-full p-5">
    <shapes-group />
    <cursor-group />
    <stroke-settings />
    <brush-settings />
  </div>
</template>

<script>
import CursorGroup from "./CursorGroup.vue";
import ShapesGroup from "./ShapesGroup.vue";
import StrokeSettings from "./StrokeSettings.vue";
import BrushSettings from "./BrushSettings.vue";

export default {
  name: "PanelButtons",
  components: { BrushSettings, StrokeSettings, ShapesGroup, CursorGroup },
};
</script>

<style scoped></style>