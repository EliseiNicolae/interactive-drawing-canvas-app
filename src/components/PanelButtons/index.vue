<template>
  <div class="max-w-[300px] w-full p-5">
    <shapes-group />
    <cursor-group />
    <settings-group />
    <brush-settings />
  </div>
</template>

<script>
import CursorGroup from "./CursorGroup.vue";
import ShapesGroup from "./ShapesGroup.vue";
import SettingsGroup from "./StrokeSettings.vue";
import BrushSettings from "@/components/PanelButtons/BrushSettings.vue";

export default {
  name: "PanelButtons",
  components: { BrushSettings, SettingsGroup, ShapesGroup, CursorGroup },
};
</script>

<style scoped></style>