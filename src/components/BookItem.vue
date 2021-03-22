<template>
  <v-card :color="book.top ? 'yellow lighten-4' : null" min-height="650px">
    <v-img :src="book.image" :alt="'couverture du livre : ' + book.title "></v-img>
    <v-card-title>{{ book.title }}</v-card-title>
    <v-card-text>{{ book.description}}</v-card-text>
    <v-card-actions>
      <span v-if="book.quantity>0">Disponible</span>
      <span v-else>Indisponible</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
</style>