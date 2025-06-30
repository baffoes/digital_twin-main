class Building {
    constructor(_id, _locatie, _functie, _capaciteit, _isOpen) {
        this.id = _id;
        this.locatie = _locatie; // locatie should be an object { x: number, y: number }
        this.functie = _functie;
        this.capaciteit = _capaciteit;
        this.isOpen = _isOpen;
        this.entity = null; // Store the Cesium entity here
    }

    // Methode om de informatie van het gebouw weer te geven
    getInfo() {
        let info = `ID: ${this.id} <br>
        Locatie: (${this.locatie.x}, ${this.locatie.y})<br>
        Functie: ${this.functie} <br>
        Capaciteit: ${this.capaciteit} <br>
        Is Open: ${this.isOpen ? 'Ja' : 'Nee'}`;
        return info;
    }

    // Methode om het gebouw op de kaart weer te geven
     displayOnMap(createBuilding) {
        const { x, y } = this.locatie;
        if (this.functie === "School") {
            this.entity = createBuilding(x, y, 60, 40, 30, 0, Cesium.Color.BLUE, this.getInfo(),this.id);
        } 
        else if (this.functie === "Winkel") {
            this.entity = createBuilding(x, y, 40, 40, 30, 0, Cesium.Color.RED, this.getInfo(),this.id);
        }
        else if (this.functie === "Appartement") {
            this.entity = createBuilding(x, y, 40, 40, 60, 0, Cesium.Color.YELLOW, this.getInfo(),this.id);
        }
        else if (this.functie === "Huis") {
            this.entity = createBuilding(x, y, 40, 40, 30, 0, Cesium.Color.PURPLE, this.getInfo(),this.id);
        }
        else{
            this.entity = createBuilding(x, y, 50, 40, 30, 0, Cesium.Color.GREEN, this.getInfo(),this.id);
        }
    }

    removeFromMap() {
        if (this.entity) {
            viewer.entities.remove(this.entity); // Remove the entity from the Cesium viewer
            this.entity = null; // Clear the reference to the entity
        }
    }
}
export default Building;
