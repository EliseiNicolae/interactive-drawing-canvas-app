<template>
  <div class="panel-buttons max-w-[450px] p-5">
    <shapes-group />
    <cursor-group />
    <settings-group />
  </div>
</template>

<script>
import CursorGroup from "./CursorGroup.vue";
import ShapesGroup from "./ShapesGroup.vue";
import SettingsGroup from "./settingsGroup.vue";

export default {
  name: "PanelButtons",
  components: { SettingsGroup, ShapesGroup, CursorGroup },
};
</script>

<style scoped></style>