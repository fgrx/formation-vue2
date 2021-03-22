<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Magasin de livres pour codeurs web</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Loading v-if="isLoading" />

        <template v-if="!isLoading">
          <h2>Rechercher</h2>
          <v-row>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="searchText"
                label="Mot clef"
                @keydown="searchAction"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="5">
              <v-select
                :items="itemsLangue"
                v-model="searchLangue"
                label="langue"
                @change="searchAction"
              ></v-select>
            </v-col>

            <v-btn color="primary" @click="reinitAction">Réinitialiser</v-btn>
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
                <BookItem
                  :book="book"
                  @addToFavs="addToFavoritesAction($event)"
                />
              </v-col>
            </v-row>
          </div>

          <v-card v-if="favorites.length" class="mt-5 mb-10">
            <v-card-title><h2>livres dans ma wishlist</h2></v-card-title>
            <v-card-text>
              <ul>
                <li v-for="favorite in favorites" :key="favorite.key">
                  <v-btn text @click="deleteWishAction(favorite)"
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
                <BookItem
                  :book="book"
                  @addToFavs="addToFavoritesAction($event)"
                />
              </v-col>
            </v-row>

            <h2>Tous les livres</h2>
            <v-row>
              <v-col
                cols="6"
                sm="4"
                v-for="book in classicBooks"
                :key="book.id"
              >
                <BookItem
                  :book="book"
                  @addToFavs="addToFavoritesAction($event)"
                />
              </v-col>
            </v-row>
          </div>
        </template>
      </v-container>
    </v-main>

    <Notification />

    <DialogDiscounts
      @close-dialog="closeDialogDiscountsAction"
      :dialog="dialogDiscounts"
      :discounts="discounts"
    />
  </v-app>
</template>

<script>
import BookItem from "@/components/BookItem.vue";
import Notification from "@/components/Notification.vue";
import DialogDiscounts from "@/components/DialogDiscounts.vue";
import Loading from "@/components/Loading.vue";

import bookService from "@/services/bookService";

export default {
  name: "App",

  components: { BookItem, Notification, DialogDiscounts, Loading },

  data: () => ({
    books: [],
    dialogDiscounts: false,
    discounts: [],
    searchText: null,
    searchLangue: null,
    booksSearchResults: [],
    favorites: [],
    isLoading: false,
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

  async created() {
    this.discounts = this.books.filter((book) => book.discount);
    this.dialogDiscounts = this.discounts.length ? true : false;

    this.isLoading = true;
    let booksInDB = [];

    booksInDB = await bookService.getBooks();

    this.books = booksInDB.data;
    this.isLoading = false;
  },

  methods: {
    searchAction() {
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
    reinitAction() {
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
    addToFavoritesAction(book) {
      this.favorites.push(book);
    },
    deleteWishAction(bookToDelete) {
      // méthode 1
      // this.favorites=this.favorites.filter(book => book.id!==bookToDelete.id)

      //méthode 2
      const position = this.favorites.indexOf(bookToDelete);
      this.favorites.splice(position, 1);
    },
    closeDialogDiscountsAction() {
      this.dialogDiscounts = false;
    },
  },
};
</script>

