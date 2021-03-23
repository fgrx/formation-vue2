import Vue from 'vue'
import Vuex from 'vuex'
import basket from "@/store/modules/basket"
import users from "@/store/modules/users"

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    basket,users
  },
  plugins: [createPersistedState()]
})
