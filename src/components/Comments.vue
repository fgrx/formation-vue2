<template>
  <div class="mt-10">
    <h2>Commentaires</h2>
    <v-card
      data-test-id="comment"
      v-for="comment in commentsBook"
      :key="comment.id"
      class="mb-5"
    >
      <v-card-title data-test-id="title-comment" primary-title>
        {{ comment.title }}
      </v-card-title>
      <v-card-text>
        {{ comment.content }}
      </v-card-text>
    </v-card>

    <h3>Ajouter un commentaire</h3>
    <p>
      <v-text-field
        v-model="title"
        label="Titre"
        data-test-id="title-comment-form"
      />
    </p>

    <p>
      <v-text-field
        label="Commentaire"
        v-model="content"
        data-test-id="content-comment-form"
        textarea
      ></v-text-field>
    </p>

    <p>
      <v-btn
        @click="addCommentAction"
        color="primary"
        data-test-id="add-comment-button"
        :disabled="disabled"
        >Ajouter</v-btn
      >
    </p>
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

  data() {
    return {
      commentsBook: [],
      title: "",
      content: "",
    };
  },
  computed: {
    disabled() {
      if (this.title === "" || this.content === "") return true;
      return false;
    },
  },

  async mounted() {
    this.commentsBook = await commentService.getComments(this.book.id);
  },
  methods: {
    addCommentAction() {
      const newComment = {
        bookID: this.book.id,
        title: this.title,
        content: this.content,
      };

      commentService.addComment(newComment);
      this.commentsBook.push(newComment);
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
