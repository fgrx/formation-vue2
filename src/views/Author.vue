<template>
  <div>
    <Loading v-if="isLoading" />
    <v-row v-if="author">
      <v-col cols="12" sm="8">
        <h1>{{ author.name }}</h1>
        <p>{{ author.bio }}</p></v-col
      >
      <v-col cols="12" sm="4"><v-img :src="author.image"></v-img></v-col>
    </v-row>

    <v-alert v-if="!author" type="warning">
      Aucune description sur l'auteur disponible
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthorService } from "../services/authorService";
import { IAuthor } from "@/interfaces/IAuthor";
import Loading from "@/components/Loading.vue";

export default Vue.extend({
  components: {
    Loading,
  },

  data() {
    return {
      author: {} as IAuthor,
      isLoading: false as Boolean,
    };
  },

  computed: {
    displayName(): string {
      if (this.author.nickname)
        return `${this.author.name} aka "${this.author.nickname}"`;
      else {
        return this.author.name;
      }
    },
  },

  async created() {
    const authorService = new AuthorService();
    this.isLoading = true;
    this.author = await authorService.getAuthor(this.$route.params.name);
    this.isLoading = false;
  },
});
</script>

<style scoped></style>
