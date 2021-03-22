<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Magasin de livres pour codeurs web</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <h2>Rechercher</h2>
        <v-row>
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="searchText"
              label="Mot clef"
              @keydown="search"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="5">
            <v-select
              :items="itemsLangue"
              v-model="searchLangue"
              label="langue"
              @change="search"
            ></v-select>
          </v-col>

          <v-btn color="primary" @click="reinit">Réinitialiser</v-btn>
        </v-row>
        <div v-if="searchText || searchLangue">
          <h2>Résultats de la recherche</h2>
          <h3 v-if="booksSearchResults.length === 0">Aucun livre trouvé</h3>
          <v-row>
            <v-col
              cols="6"
              sm="4"
              v-for="book in booksSearchResults"
              :key="book.id"
            >
              <BookItem :book="book" @addToFavs="addToFavorites($event)" />
            </v-col>
          </v-row>
        </div>

        <v-card v-if="favorites.length" class="mt-5 mb-10">
          <v-card-title><h2>livres dans ma wishlist</h2></v-card-title>
          <v-card-text>
            <ul>
              <li v-for="favorite in favorites" :key="favorite.key">
                <v-btn text @click="deleteWish(favorite)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
                {{ favorite.title }}
              </li>
            </ul>
          </v-card-text>
        </v-card>

        <div v-if="!searchText && !searchLangue">
          <h2>Top livres</h2>
          <v-row>
            <v-col cols="6" sm="4" v-for="book in topBooks" :key="book.id">
              <BookItem :book="book" @addToFavs="addToFavorites($event)" />
            </v-col>
          </v-row>

          <h2>Tous les livres</h2>
          <v-row>
            <v-col cols="6" sm="4" v-for="book in classicBooks" :key="book.id">
              <BookItem :book="book" @addToFavs="addToFavorites($event)" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>

    <Notification />

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

import BookItem from "@/components/BookItem.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "App",

  components: { BookItem, Notification },

  data: () => ({
    books: booksdb,
    promos: [],
    dialog: false,
    searchText: null,
    searchLangue: null,
    booksSearchResults: [],
    favorites: [],
    itemsLangue: [
      { text: "Tout", value: null },
      { text: "Français", value: "fr" },
      { text: "English", value: "en" },
    ],
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
    //this.dialog = this.promos.length ? true : false;
  },

  methods: {
    search() {
      this.booksSearchResults = this.books;

      if (this.searchLangue)
        this.booksSearchResults = this.booksSearchResults.filter(
          (book) => book.lang === this.searchLangue
        );

      if (this.searchText) {
        this.booksSearchResults = this.booksSearchResults.filter(
          (book) =>
            book.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
            book.content.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    },
    reinit() {
      // Autre écriture possible :
      // this.booksSearchResults = [];
      // this.searchText = null;
      // this.searchLangue = null;

      [this.booksSearchResults, this.searchLangue, this.searchText] = [
        [],
        null,
        null,
      ];
    },
    addToFavorites(book) {
      this.favorites.push(book);
    },
    deleteWish(bookToDelete) {
      // méthode 1
      // this.favorites=this.favorites.filter(book => book.id!==bookToDelete.id)

      //méthode 2
      const position = this.favorites.indexOf(bookToDelete);
      this.favorites.splice(position, 1);
    },
  },
};
</script>

