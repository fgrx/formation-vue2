<template>
  <div>
    <Loading v-if="isLoading" />

    <template v-if="book">
      <v-row v-if="!isLoading">
        <v-col cols="12" sm="4">
          <v-img
            :src="book.image"
            :alt="'couverture du livre : ' + book.title"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <h1>{{ book.title }}</h1>
          <p class="book__author">
            <router-link
              :to="{ name: 'Author', params: { name: book.author } }"
            >
              {{ book.author }}
            </router-link>
          </p>
          <v-rating
            readonly="readonly"
            v-model="book.rating"
            color="accent"
          ></v-rating>
          <p class="book__description">{{ book.description }}</p>

          <Note fontcolor="blue" bgcolor="grey lighten-4">{{
            bookDisponibility
          }}</Note>

          <Price class="mb-5" v-if="book.price" :book="book" />
          <p>
            <v-btn
              @click="buyMixinAction(book)"
              v-if="book.quantity > 0"
              dark
              color="pink"
              x-large
              ><v-icon>mdi-basket</v-icon> Acheter</v-btn
            >
          </p>
        </v-col>
      </v-row>
      <div class="book__content">
        {{ book.content }}
      </div>

      <Comments :book="book"></Comments>
    </template>
  </div>
</template>

<script>
import bookService from "@/services/bookService";
import Loading from "@/components/Loading.vue";
import Note from "@/components/Note.vue";
import Price from "@/components/Price.vue";
import Comments from "@/components/Comments.vue";

import BuyBook from "@/mixins/BuyBook";

export default {
  components: {
    Loading,
    Note,
    Price,
    Comments,
  },
  mixins: [BuyBook],

  computed: {
    bookDisponibility() {
      let status;
      if (this.book.quantity > 0) status = "En stock";
      if (this.book.quantity <= 0) status = "En rupture de stock";
      if (this.book.quantity === 1) status = "Dernier exemplaire en stock";
      return status;
    },
  },
  data() {
    return {
      book: null,
      colorNote: "",
      isLoading: false,
      comments: [],
    };
  },
  async created() {
    const bookID = this.$route.params.id;
    this.isLoading = true;
    const bookData = await bookService.getBookByID(bookID);
    this.isLoading = false;
    this.book = bookData.data;
  },
};
</script>

<style lang="scss" scoped></style>
