<template>
  <div class="max-w-[300px] w-full p-5">
    <shapes-group />
    <cursor-group />
    <stroke-settings />
    <brush-settings />
  </div>
</template>

<script>
import BrushSettings from "@/components/PanelButtons/BrushSettings.vue";
import StrokeSettings from "@/components/PanelButtons/StrokeSettings.vue";
import ShapesGroup from "@/components/PanelButtons/ShapesGroup.vue";
import CursorGroup from "@/components/PanelButtons/CursorGroup.vue";

export default {
  name: "PanelButtons",
  components: { BrushSettings, StrokeSettings, ShapesGroup, CursorGroup },
};
</script>

<style scoped></style>
