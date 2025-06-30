class Vehicle {
    constructor(id, type, isDriving, startingpoint, destination, speed, capacity) {
        this.id = id;
        this.type = type;
        this.isDriving = isDriving;
        this.startingpoint = startingpoint;
        this.destination = destination;
        this.speed = speed;
        this.capacity = capacity;
        // this.reisTijd = reisTijd;
        // this.reisTijdEind = reisTijdEind;
    }

    // Methode om de status van het voertuig weer te geven
    getInfo() {
        return `ID: ${this.id}, Type: ${this.type}, Is Driving: ${this.isDriving ? 'Yes' : 'No'}, startingpoint: ${this.startingpoint}, Destination: ${this.destination}, speed: ${this.speed}`;
    }

    setupvehicles(vehicles, graph, method) {
        vehicles.forEach(vehicle => {
            const startingpoint = graph.nodes.filter(point1 => point1.ID = vehicle.startingpoint);
            const destination = graph.nodes.filter(point2 => point2.ID = vehicle.destination);
    
            method(startingpoint.point1, 5, 2, 1.5, 0, Cesium.Color.BLUE)
            }
        );
    }
}

export default Vehicle;

