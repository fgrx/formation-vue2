<template>
  <div>
    <h1>Connexion</h1>
    <v-form>
      <v-text-field
        type="text"
        label="login"
        v-model="login"
        @click="error = ''"
      ></v-text-field>
      <v-text-field
        type="password"
        label="Mot de passe"
        v-model="password"
        @click="error = ''"
      ></v-text-field>
      <v-btn @click="connexionAction" color="primary">Connexion</v-btn>
      <v-alert v-if="error" type="error">{{ error }}</v-alert>
    </v-form>
  </div>
</template>

<script>
import userService from "@/services/userService";

export default {
  data() {
    return {
      login: "admin@admin.com",
      password: "123456",
      error: "",
    };
  },
  methods: {
    async connexionAction() {
      const testConnexion = await userService.findUser(
        this.login,
        this.password
      );

      const userFound = testConnexion.data;

      if (userFound.token) {
        this.$store.dispatch("updateUserAction", userFound);
        this.$router.push({ name: "Admin" });
      } else {
        this.error = "Mauvais login ou mot de passe";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
