<template>
  <v-card :color="book.top ? 'yellow lighten-4' : null" min-height="650px">
    <router-link :to="{ name: 'Book', params: { id: book.id } }">
      <v-img
        :src="book.image"
        :alt="'couverture du livre : ' + book.title"
      ></v-img>
    </router-link>
    <v-card-title>{{ book.title }}</v-card-title>
    <v-card-text>{{ book.description }}</v-card-text>
    <v-card-actions>
      <span v-if="book.quantity > 0">Disponible</span>
      <span v-else>Indisponible</span>

      <v-spacer></v-spacer>

      <v-btn @click="addToFavsAction" text
        ><v-icon>mdi-heart</v-icon> wishlist</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  props: {
    book: {
      type: Object,
      default: null,
    },
  },
  methods: {
    addToFavsAction() {
      this.$emit("addToFavs", this.book);
      EventBus.$emit("notification", "Livre ajouté à ma wishlist");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>