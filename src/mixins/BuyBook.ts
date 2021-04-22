import Vue from "vue";

export default Vue.extend({
  methods: {
    buyMixinAction(book) {
      this.$store.dispatch("addItemAction", book);
    },
  },
});
