<template>
  <div class="flex gap-2">
    <v-btn color="blue" @click="undo" :disabled="historyIndex === 0">
      <v-icon icon="mdi-arrow-u-left-top-bold" class="mr-2"></v-icon>
    </v-btn>

    <v-btn
      color="blue"
      @click="redo"
      :disabled="historyIndex === historyLayouts.length - 1"
    >
      <v-icon icon="mdi-arrow-u-right-top-bold" class="mr-2"></v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UndoRedoButtons",
  computed: {
    ...mapGetters({
      historyLayouts: "canvas/getHistoryLayouts",
      historyIndex: "canvas/getHistoryIndex",
    }),
  },
  methods: {
    undo() {
      this.$store.dispatch("canvas/undo");
    },
    redo() {
      this.$store.dispatch("canvas/redo");
    },
  },
};
</script>

<style scoped></style>
