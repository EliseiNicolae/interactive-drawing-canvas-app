<template>
  <div class="max-w-[350px] w-full p-5">
    <shapes-group />
    <cursor-group />
    <settings-group />
  </div>
</template>

<script>
import CursorGroup from "./CursorGroup.vue";
import ShapesGroup from "./ShapesGroup.vue";
import SettingsGroup from "./strokeSettings.vue";

export default {
  name: "PanelButtons",
  components: { SettingsGroup, ShapesGroup, CursorGroup },
};
</script>

<style scoped></style>