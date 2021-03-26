export default{
    multiplication(a,b){
        if(isNaN(a) || isNaN(b))throw new Error("Des nombres sont requis")
        return a*b
    },

    displayPersonInfos(person){
        return `${person.firstName} ${person.name} >> age : ${person.age}`
    }
}