class Tree {
    constructor(id, type, locatie) {
        this.id = id;         
        this.type = type;  
        this.locatie = locatie; 
    }

    // Methode om informatie over de boom weer te geven
    getInfo() {
        return `ID: ${this.id}, Type: ${this.type}, Locatie: ${this.locatie}`;
    }
}


