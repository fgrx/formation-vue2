import axios from 'axios'
import EventBus from "@/plugins/eventBus"

export default{
    async getBooks(){
        let booksInDB=[]
        try{
            booksInDB = await axios.get(`${process.env.VUE_APP_SERVER_URL}/books`);    
        }catch(e){
            console.log("Error in DB call",e);
            EventBus.$emit(
                "notification",
                "Erreur dans la base de données, impossible de récupérer les livres"
            );
        }
        return booksInDB
    },

    async getBookByID(id){
        let book=[]
        try{
            book = await axios.get(`${process.env.VUE_APP_SERVER_URL}/books/${id}`);    
        }catch(e){
            console.log("Error in DB call",e);
            EventBus.$emit(
                "notification",
                "Erreur dans la base de données, impossible de récupérer le livre demandé"
            );
        }
        return book
    }
}