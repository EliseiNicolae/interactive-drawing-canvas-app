<template>
  <v-btn color="success" @click="downloadImage">
    <v-icon icon="mdi-download-box" class="mr-2"></v-icon>
    Download
  </v-btn>
</template>

<script>
export default {
  name: "DownloadBtn",
  components: {},
  props: {
    dataUrl: String,
  },
  methods: {
    downloadImage() {
      const link = document.createElement("a");
      link.href = this.dataUrl;
      link.download = "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped></style>
