<template>
  <div class="mt-3 mb-8">
    <h3 class="font-bold text-2xl">Panel buttons</h3>
    <div class="my-3 flex flex-column gap-2">
      <h3>Shape drawing</h3>

      <div class="flex gap-2">
        <v-btn variant="outlined" @click="addShapeInCanvas(V_CIRCLE)">
          <v-icon icon="mdi-circle-outline"></v-icon>
        </v-btn>
        <v-btn variant="outlined" @click="addShapeInCanvas(V_RECT)">
          <v-icon icon="mdi-square-outline"></v-icon>
        </v-btn>
        <v-btn variant="outlined" @click="addShapeInCanvas(V_REGULAR_POLYGON)">
          <v-icon icon="mdi-triangle-outline"></v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { V_CIRCLE, V_RECT, V_REGULAR_POLYGON } from "@/constants/constants";
import { mapGetters } from "vuex";
import { uuid } from "@/utils/uuid";

export default {
  name: "ShapesGroup",
  computed: {
    V_RECT() {
      return V_RECT;
    },
    V_REGULAR_POLYGON() {
      return V_REGULAR_POLYGON;
    },
    V_CIRCLE() {
      return V_CIRCLE;
    },
  },
  methods: {
    ...mapGetters({
      getCursorType: "panelButtons/getCursorType",
    }),
    addShapeInCanvas(shape) {
      this.$store.dispatch("canvas/addNewShape", {
        component_name: shape.component_name,
        props: {
          ...shape.props,
          id: `${shape.component_name}-${uuid()}`,
          draggable: this.getCursorType() === "grab",
          addInHistory: true,
        },
      });
    },
  },
};
</script>

<style scoped></style>