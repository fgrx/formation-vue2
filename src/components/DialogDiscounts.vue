<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">Promotions ! </v-card-title>
      <v-card-text>
        Les livres suivant sont en promotion :
        <ul>
          <li v-for="discount in discounts" :key="discount.id">
            {{ discount.title }} - {{ discount.author }}
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeDialogAction">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    discounts: {
      type: Array,
      default: null,
    },

    dialog: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    closeDialogAction() {
      this.$emit("close-dialog", true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>