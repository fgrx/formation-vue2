export default{
    multiplication(a,b){
        if(isNaN(a) || isNaN(b))return "error"
        return a*b
    },

    displayPersonInfos(person){
        return `${person.firstName} ${person.name} >> age : ${person.age}`
    }
}