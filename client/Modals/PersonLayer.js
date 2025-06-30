class PersonLayer{
    constructor(){
        this.persons = []
    }

    addPerson(person){
       this.persons.push(person);
       console.log("Person added : " + person.getInfo());
    }
}