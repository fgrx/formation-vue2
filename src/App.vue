<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Magasin de livres pour codeurs web</v-toolbar-title>
      <v-spacer> </v-spacer
      ><v-btn color="deep-orange" :to="{ name: 'Home' }">Accueil</v-btn>
      <v-btn color="deep-orange" class="ml-5" :to="{ name: 'About' }"
        >A propos</v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <Notification />
  </v-app>
</template>

<script>
import Notification from "@/components/Notification.vue";

export default {
  name: "App",

  components: { Notification },
};
</script>

