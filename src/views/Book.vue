<template>
  <div>
    <Loading v-if="isLoading" />

    <v-row v-if="!isLoading">
      <v-col cols="12" sm="4">
        <v-img
          :src="book.image"
          :alt="'couverture du livre : ' + book.title"
        ></v-img>
      </v-col>
      <v-col cols="12" sm="8">
        <h1>{{ book.title }}</h1>
        <p class="book__author">{{ book.author }}</p>
        <v-rating
          readonly="readonly"
          v-model="book.rating"
          color="accent"
        ></v-rating>
        <p class="book__description">{{ book.description }}</p>
      </v-col>
    </v-row>
    <div class="book__content">
      {{ book.content }}
    </div>
  </div>
</template>

<script>
import bookService from "@/services/bookService";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      book: {},
      isLoading: false,
    };
  },
  async created() {
    const bookID = this.$route.params.id;
    const bookData = await bookService.getBookByID(bookID);
    this.book = bookData.data;
  },
};
</script>

<style lang="scss" scoped>
</style>