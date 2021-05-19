import axios from "axios";
import EventBus from "@/plugins/eventBus";
import store from "@/store/index";

export default {
  async buyAction(order) {
    let res = null;
    try {
      //Ajoute la commande en base de données
      res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/orders`, order);

      //Met à jour le stock de livre
      const updateStockInDB = (book) => {
        book.quantity--;
        axios.put(`${process.env.VUE_APP_SERVER_URL}/books/${book.id}`, book);
      };

      //version moins longue
      order.items.forEach((book) => updateStockInDB(book));

      //version courte
      order.items.forEach(updateStockInDB);
    } catch (err) {
      console.log("There was an error trying to save in DB", err);
      EventBus.$emit(
        "notification",
        "Erreur interne, impossible de sauvegarder votre commande"
      );
    }

    return res;
  },
  async getOrders() {
    let res = null;
    try {
      //Récupère le token du store pour l'identification
      const state: any = store.state;
      const userInStore = state.users.user;
      const reqParams = {
        headers: { Authorization: `Bearer ${userInStore.token}` },
      };

      //Pour récupérer toutes les commandes on envoie le token
      res = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/orders`,
        reqParams
      );
    } catch (err) {
      console.log("error while fetching orders", err);
      EventBus.$emit(
        "notification",
        "Erreur interne, impossible d'obtenir la liste des commandes"
      );
    }

    return res;
  },
  async getDeviseInfos(code) {
    let res = null;
    try {
      //Ajoute la commande en base de données
      res = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/devises?title=${code}`
      );
    } catch (err) {
      console.log("error while fetching devise", err);
      EventBus.$emit(
        "notification",
        `Erreur interne, impossible d'obtenir le cours de ${code}`
      );
    }

    return res;
  },
};
