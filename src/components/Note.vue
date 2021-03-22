<template>
  <div>
    <p :class="`pa-5 rounded subtitle-2 ${bgcolor} ${fontcolor}--text`">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: "blue",
    },
    fontcolor: {
      type: String,
      default: "black",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>