<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Magasin de livres pour codeurs web</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col cols="6" sm="4" v-for="book in books" :key="book.id">
            <v-card :color="book.top ? 'yellow lighten-4' : null" min-height="650px">
              <v-img :src="book.image" :alt="'couverture du livre : ' + book.title "></v-img>
              <v-card-title>{{ book.title }}</v-card-title>
              <v-card-text>{{ book.description}}</v-card-text>
              <v-card-actions>
                <span v-if="book.quantity>0">Disponible</span>
                <span v-else>Indisponible</span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import booksdb from "@/data/booksdb";

export default {
  name: "App",

  components: {},

  data: () => ({
    books: booksdb
  })
};
</script>

