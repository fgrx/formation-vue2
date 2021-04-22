import axios from "axios";
import EventBus from "@/plugins/eventBus";
import { IAuthor } from "@/interfaces/IAuthor";

export class AuthorService {
  async getAuthor(name: string): Promise<IAuthor | never> {
    let author: IAuthor;

    try {
      const authorInDB = await axios.get(
        `${process.env.VUE_APP_SERVER_URL}/authors?name=${name}`
      );

      author = authorInDB.data[0];
    } catch (e) {
      console.log("Error in DB call", e);
      EventBus.$emit(
        "notification",
        "Erreur dans la base de données, impossible de récupérer l'autheur"
      );
      throw "error ! to get author";
    }

    return author;
  }
}
