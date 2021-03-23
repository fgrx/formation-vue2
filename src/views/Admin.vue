<template>
  <div>

    <h1>Administration</h1>

    <p><v-btn color="success" @click="disconnectAction">Déconnexion</v-btn></p>

    <Loading v-if="isLoading" />

    <p v-if="!orders.length">Aucune commande pour le moment</p>

    <div v-for="order in orders" :key="order.id" class='commande'>
        <p><strong>Numéro : {{ order.id }}</strong></p>
        <p>Total : {{ order.total }}€</p>
        <p>Produits : <ul><li v-for="book in order.items" :key="book.id">{{ book.title }}</li></ul></p>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import shopService from "@/services/shopService";

export default {
  components: {
    Loading,
  },

  data() {
    return {
      orders: [],
      isLoading: false,
    };
  },

  async created() {
    this.isLoading = true;
    const ordersFromDB = await shopService.getOrders();
    this.orders = ordersFromDB.data;
    this.isLoading = false;
  },

  methods: {
    disconnectAction() {
      this.$store.dispatch("updateUserAction", null);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.commande {
  border-bottom: 1px solid grey;
  margin-top: 1em;
}
</style>