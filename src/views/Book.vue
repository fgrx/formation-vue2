<template>
  <div>
    <v-row>
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
export default {
  data() {
    return {
      book: {},
    };
  },
  async created() {
    const bookData = await this.axios.get(
      `${process.env.VUE_APP_SERVER_URL}/books/${this.$route.params.id}`
    );
    this.book = bookData.data;
  },
};
</script>

<style lang="scss" scoped>
</style>