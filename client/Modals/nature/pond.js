class pond {
    constructor(locatie) {     
        this.locatie = locatie; 
    }

    // Methode om informatie over de boom weer te geven
    getInfo() {
        return `Locatie: ${this.locatie}`;
    }
}