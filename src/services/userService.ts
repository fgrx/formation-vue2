import axios from "axios";
import EventBus from "@/plugins/eventBus";

export default {
  async findUser(login, password) {
    let res = null;
    try {
      res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/users`, {
        params: {
          login,
          password,
        },
      });
    } catch (err) {
      console.log("There was an error trying to find user in DB", err);
      EventBus.$emit(
        "notification",
        "Erreur interne, impossible de vous authentifier"
      );
    }

    return res;
  },
};
