<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Magasin de livres pour codeurs web</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Magasin de livres pour codeurs curieux</h1>

        <h2>Top livres</h2>
        <v-row>
          <v-col cols="6" sm="4" v-for="book in topBooks" :key="book.id">
            <BookItem :book="book" />
          </v-col>
        </v-row>

        <h2>Tous les livres</h2>
        <v-row>
          <v-col cols="6" sm="4" v-for="book in classicBooks" :key="book.id">
            <BookItem :book="book" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Promotions ! </v-card-title>
        <v-card-text>
          Les livres suivant sont en promotion :
          <ul>
            <li v-for="promo in promos" :key="promo.id">
              {{ promo.title }} - {{ promo.author }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import booksdb from "@/data/booksdb";

import BookItem from "./components/BookItem.vue";

export default {
  name: "App",

  components: { BookItem },

  data: () => ({
    books: booksdb,
    promos: [],
    dialog: false,
  }),
  computed: {
    topBooks() {
      //Version 1
      // let topBooksFiltered = [];
      // for (const book of this.books) {
      //   if (book.top) {
      //     topBooksFiltered.push(book);
      //   }
      // }
      // return topBooksFiltered;

      // Version 2
      // const topBooksFiltered = this.books.filter(function(book) {
      //   if (book.top === true) {
      //     return book;
      //   }
      // });
      // return topBooksFiltered;

      //version 3
      return this.books.filter((book) => book.top);
    },
    classicBooks() {
      return this.books.filter((book) => !book.top);
    },
  },

  mounted() {
    console.log("Component mounted !");
  },

  created() {
    console.log("Component created !");
    this.promos = this.books.filter((book) => book.discount);
    this.dialog = this.promos.length ? true : false;
  },
};
</script>

