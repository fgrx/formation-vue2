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
            <transition-group name="basket-transition" tag="div">
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
            </transition-group>
          </v-list>

          <p><strong>Total : </strong>{{ totalBasket }}</p>
          <p>
            <a @click="sortBasket">Ranger par prix</a>
          </p>
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
import { mapGetters } from "vuex";

import shopService from "@/services/shopService";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["items", "totalBasket"]),
    // Les computed suivantes sont remplacées par le mapGetter
    // items() {
    //   return this.$store.state.basket.items;
    // },
    // totalBasket() {
    //   return this.items.reduce((reducer, item) => reducer + item.price, 0);
    // },
  },
  data() {
    return {
      thankYouMessage: "",
    };
  },
  methods: {
    closeDialogAction() {
      this.$emit("close-dialog", true);
      this.thankYouMessage = "";
    },
    deleteItemAction(item) {
      this.$store.dispatch("removeItemAction", item);
    },
    async buyAction() {
      const order = { total: this.totalBasket, items: this.items };
      const result = await shopService.buyAction(order);

      const successCodes = [200, 201, 204];

      if (successCodes.includes(result.status)) {
        this.thankYouMessage = "Merci pour votre commande !";
        this.$store.dispatch("updateItemsAction", []);
      }
    },
    sortBasket() {
      this.items.sort((a, b) => a.price - b.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.basket-transition-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.basket-transition-leave-active {
  transition: all 0.5s ease-out;
}

.basket-transition-move {
  transition: transform 0.5s ease-out;
}
</style>
