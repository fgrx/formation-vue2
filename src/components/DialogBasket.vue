<template>
  <v-dialog v-model="dialog" width="700" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Panier d'achat
      </v-card-title>

      <v-card-text>
        <v-alert v-if="thankYouMessage" type="success">
          {{ thankYouMessage }}
        </v-alert>

        <div v-if="!thankYouMessage">
          <p v-if="!items.length">Aucun produit dans le panier</p>

          <v-list v-if="items.length">
            <v-list-item v-for="item in items" :key="item.id">
              <v-list-item-icon>
                <v-btn @click="deleteItemAction(item)" icon>
                  <v-icon color="pink">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.price }}€</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <p><strong>Total : </strong>{{ totalPanier }}</p>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="!items.length" color="primary" @click="buyAction()">
          Acheter
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="closeDialogAction"> Fermer </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    items() {
      return this.$store.state.basket.items;
    },
    totalPanier() {
      return this.items.reduce((reducer, item) => reducer + item.price, 0);
    },
  },
  data() {
    return {
      thankYouMessage: "",
    };
  },
  methods: {
    closeDialogAction() {
      this.$emit("close-dialog", true);
    },
    deleteItemAction(item) {
      this.$store.dispatch("removeItemAction", item);
    },
    buyAction() {
      //todo !
    },
  },
};
</script>

<style lang="scss" scoped>
</style>