import axios from "axios";
import EventBus from "@/plugins/eventBus";

export default {
  async addComment(comment) {
    let res = null;
    try {
      res = await axios.post(
        `${process.env.VUE_APP_SERVER_URL}/comments/`,
        comment
      );
    } catch (e) {
      console.log("Error in DB call", e);
      EventBus.$emit(
        "notification",
        "Erreur dans la base de données, impossible d'ajouter le commentaire"
      );
    }
    return res;
  },
  async getComments(bookID) {
    let comments = [];
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/comments?bookID=${bookID}`;

      const result = await axios.get(url);
      comments = result.data;
    } catch (e) {
      console.log("Error in DB call", e);
      EventBus.$emit(
        "notification",
        "Erreur dans la base de données, impossible d'obtenir les commentaires"
      );
    }
    return comments;
  },
};
