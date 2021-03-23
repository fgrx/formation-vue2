<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Magasin de livres pour codeurs web</v-toolbar-title>
      <v-spacer> </v-spacer
      ><v-btn color="deep-orange" :to="{ name: 'Home' }">Accueil</v-btn>
      <v-btn color="deep-orange" class="ml-4" :to="{ name: 'About' }"
        >A propos</v-btn
      >

      <v-btn color="deep-orange" class="ml-4" :to="{ name: 'Admin' }"
        >Admin</v-btn
      >
      <v-btn
        @click="dialogBasket = true"
        color="pink"
        fab
        large
        dark
        class="ml-4"
      >
        <v-badge color="purple" :content="items.length" v-if="items.length">
          <v-icon dark>mdi-basket</v-icon>
        </v-badge>
        <v-icon v-else dark>mdi-basket</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <transition name="page-transition" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <Notification />
    <DialogBasket :dialog="dialogBasket" @close-dialog="dialogBasket = false" />
  </v-app>
</template>

<script>
import Notification from "@/components/Notification.vue";
import DialogBasket from "@/components/DialogBasket.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Notification, DialogBasket },
  computed: {
    ...mapGetters(["items"]),
  },
  data() {
    return {
      dialogBasket: false,
    };
  },
};
</script>

<style scoped>
.page-transition-enter {
  opacity: 0;
  transform: translateX(-100px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.5s ease-out;
}
</style>
