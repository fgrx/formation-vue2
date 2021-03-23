import axios from "axios";

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
    }

    return res;
  },
  async getOrders() {
    let res = null;
    try {
      //Ajoute la commande en base de données
      res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/orders`);
    } catch (err) {
      console.log("There was an error trying to save in DB", err);
    }

    return res;
  },
};
