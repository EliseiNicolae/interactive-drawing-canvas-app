export const DEFAULT_VALUES = {
  strokeColor: "black",
  fill: "transparent",
  strokeWidth: 8,
};

export const V_CIRCLE = {
  component_name: "v-circle",
  props: {
    x: 100,
    y: 100,
    radius: 50,
    stroke: DEFAULT_VALUES.strokeColor,
    fill: "transparent",
    strokeWidth: DEFAULT_VALUES.strokeWidth,
    hitStrokeWidth: 20,
  },
};

export const V_RECT = {
  component_name: "v-rect",
  props: {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    stroke: DEFAULT_VALUES.strokeColor,
    fill: "transparent",
    strokeWidth: DEFAULT_VALUES.strokeWidth,
    hitStrokeWidth: 20,
  },
};

export const V_REGULAR_POLYGON = {
  component_name: "v-regular-polygon",
  props: {
    x: 100,
    y: 100,
    sides: 3,
    radius: 70,
    stroke: DEFAULT_VALUES.strokeColor,
    fill: "transparent",
    strokeWidth: DEFAULT_VALUES.strokeWidth,
    hitStrokeWidth: 20,
  },
};
