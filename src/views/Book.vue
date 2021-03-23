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

        <Note fontcolor="blue" bgcolor="grey lighten-4">{{
          bookDisponibility
        }}</Note>

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
  </div>
</template>

<script>
import bookService from "@/services/bookService";
import Loading from "@/components/Loading.vue";
import Note from "@/components/Note.vue";

import BuyBook from "@/mixins/BuyBook";

export default {
  components: {
    Loading,
    Note,
  },
  mixins: [BuyBook],
  metaInfo() {
    return {
      title: this.book.title + " - CodeBook",
      titleTemplate: null,
      meta: [
        {
          name: "description",
          content: "Toutes les informations sur " + this.book.title,
        },
      ],
    };
  },
  computed: {
    bookDisponibility() {
      switch (this.book) {
        case this.book <= 0:
          return "Livre indisponible";
        case this.book === 1:
          return "Dernier exemplaire en stock !";
        default:
          return "En stock";
      }
    },
  },
  data() {
    return {
      book: {},
      colorNote: "",
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