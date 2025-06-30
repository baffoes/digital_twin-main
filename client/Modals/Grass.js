class Grass {
    constructor(type, locatie) {     
        this.type = type;  
        this.locatie = locatie; 
    }

    // Methode om informatie over de boom weer te geven
    getInfo() {
        return `Type: ${this.type}, Locatie: ${this.locatie}`;
    }
}


