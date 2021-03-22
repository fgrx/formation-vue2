<template>
  <div>
    <v-snackbar v-model="snackbar" color="pink">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  data() {
    return {
      snackbar: false,
      text: null,
    };
  },

  mounted() {
    EventBus.$on("notification", (notification) => {
      this.snackbar = true;
      this.text = notification;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>