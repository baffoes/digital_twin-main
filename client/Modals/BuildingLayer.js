class BuildingLayer {
    constructor() {
        this.buildings = []; // Array to store building instances
    }

    // Add a building to the layer
    addBuilding(building) {
        this.buildings.push(building);
        console.log("Building added:", building.getInfo());
    }

    // Display all buildings on the map
    getBuildings(createBoxFunction) {
        this.buildings.forEach(building => {
            building.displayOnMap(createBoxFunction);
        });
    }

    removeBuilding(buildingId) {
        // Assuming each building has an `id` property
        const index = this.buildings.findIndex(b => b.id === buildingId);
        if (index > -1) {
            this.buildings.splice(index, 1);
        }
    }

    // Close all buildings and update their status in the database
    async closeBuildings() {
        try {
            // Send a PUT request to close all buildings
            const response = await fetch("http://localhost:8080/api/buildings/closeAll", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                this.buildings.forEach(building => {
                    building.isOpen = false; // Close the building
                });
                const updatedBuildings = await response.json();
                console.log("All buildings closed successfully:", updatedBuildings);
                
            } else {
                console.error("Failed to close all buildings:", response.statusText);
            }
        } catch (error) {
            console.error("Error closing all buildings:", error);
        }
    }

    async openBuildings() {
        try {
            // Send a PUT request to close all buildings
            const response = await fetch("http://localhost:8080/api/buildings/openAll", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                this.buildings.forEach(building => {
                    building.isOpen = true; // Close the building
                });
                const updatedBuildings = await response.json();
                console.log("All buildings opened successfully:", updatedBuildings);
                
            } else {
                console.error("Failed to open all buildings:", response.statusText);
            }
        } catch (error) {
            console.error("Error closing open buildings:", error);
        }
    }
}

export default BuildingLayer;
