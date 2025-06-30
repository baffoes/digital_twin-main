class Person {
    constructor(id, werkplaats, positie, thuis) {
        this.id = id;
        this.werkplaats = werkplaats;
        this.positie = positie;
        this.thuis = thuis;
    }

    // Methode om de informatie van de persoon weer te geven
    getInfo() {
        return `ID: ${this.id}, Werkplaats: ${this.werkplaats}, Positie: ${this.positie}, Thuis: ${this.thuis}`;
    }

    changePerson(){
    }

}

