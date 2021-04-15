<template>
  <div class="mt-5">
    <h2>
      Commentaires pour le livre
      <span data-test-id="title-book">{{ book.title }}</span>
    </h2>
    <h3>
      Nombre de commentaires :
      <span data-test-id="nb-comments">{{ comments.length }}</span>
    </h3>

    <v-card
      data-test-id="comment"
      v-for="comment in comments"
      :key="comment.id"
      class="mb-5"
    >
      <v-card-title data-test-id="title-comments">{{
        comment.title
      }}</v-card-title>
      <v-card-text>
        {{ comment.content }}
      </v-card-text>
    </v-card>

    <h3>Ajouter un commentaire</h3>
    <v-text-field label="Titre" v-model="titleComment"></v-text-field>
    <v-text-field label="Content" v-model="contentComment"></v-text-field>
    <v-btn
      @click="addCommentAction()"
      data-test-id="add-button"
      :disabled="isDisabled"
      color="primary"
      >Ajouter</v-btn
    >
  </div>
</template>

<script>
import commentService from "@/services/commentService";

export default {
  props: {
    book: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isDisabled() {
      if (this.contentComment && this.titleComment) return false;
      return true;
    },
  },
  data() {
    return {
      comments: [],
      contentComment: "",
      titleComment: "",
    };
  },
  async created() {
    this.comments = await commentService.getComments(this.book.id);
  },

  methods: {
    addCommentAction() {
      const comment = {
        bookID: this.book.id,
        title: this.titleComment,
        content: this.contentComment,
      };

      this.comments.push(comment);

      commentService.addComment();
    },
  },
  //   created () {
  //       this.comments=this.serviceComments(this.book.id)
  //   },
};
</script>

<style lang="scss" scoped></style>
