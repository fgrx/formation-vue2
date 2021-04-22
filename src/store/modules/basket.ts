export default {
  state: {
    items: [],
  },
  getters: {
    items: (state) => {
      return state.items;
    },
    totalBasket: (state) => {
      return state.items.reduce((reducer, item) => reducer + item.price, 0);
    },
  },
  mutations: {
    updateItems(state, payload) {
      state.items = payload;
    },
    addItem(state, productPayload) {
      state.items.push(productPayload);
    },
    removeItem(state, productPayload) {
      // const productIndex = state.items.indexOf(productPayload)
      // state.items.splice(productIndex,1)
      // ou
      state.items = state.items.filter((item) => item.id !== productPayload.id);
    },
  },
  actions: {
    updateItemsAction({ commit }, payload) {
      commit("updateItems", payload);
    },
    addItemAction({ commit }, productPayload) {
      commit("addItem", productPayload);
    },
    removeItemAction({ commit }, productPayload) {
      commit("removeItem", productPayload);
    },
  },
};
