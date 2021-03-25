<template>
  <div v-if="book.quantity > 0">
    Prix :
    <span data-test-id="price" :class="{ strike: book.discount }"
      >{{ price }}{{ currentDevise }}</span
    >
    <span v-if="book.discount" data-test-id="discount">
      {{ discount }}{{ currentDevise }}</span
    >
    <v-btn
      @click="convertToAction()"
      color="success"
      data-test-id="convertButton"
      class="ml-3"
      small
      >convert to {{ targetDevise }}</v-btn
    >
  </div>
</template>

<script>
import shopService from "@/services/shopService";

export default {
  props: {
    book: {
      type: Object,
      default: null,
    },
  },

  computed: {
    targetDevise() {
      if (this.currentDevise === "€") {
        return "$";
      }

      return "€";
    },
  },

  data() {
    return {
      price: this.book.price,
      discount: this.book.discount,
      textButton: `convert to ${this.targetDevise}`,
      currentDevise: "€",
    };
  },

  methods: {
    async convertToAction() {
      if (this.currentDevise === "€") {
        const exchangeRate = await this.getExchangeRate();

        const priceInDollars = this.book.price * exchangeRate;
        this.price = this.roundNumber(priceInDollars);

        if (this.book.discount) {
          const discountInDollars = this.book.discount * exchangeRate;
          this.discount = this.roundNumber(discountInDollars);
        }
      } else {
        this.price = this.book.price;
        this.discount = this.book.discount;
      }
      this.currentDevise = this.targetDevise;
    },
    async getExchangeRate() {
      const exchangeData = await shopService.getDeviseInfos(this.targetDevise);
      return exchangeData.data[0].exchangeRate;
    },
    roundNumber(number) {
      return Math.round(number * 100) / 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.strike {
  text-decoration: line-through;
}
</style>