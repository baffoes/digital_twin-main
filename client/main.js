import Building from './Modals/Building.js';
import BuildingLayer from './Modals/BuildingLayer.js';
import Event from './Modals/Event.js';
import EventLayer from './Modals/EventLayer.js'
import Twingraph from './Modals/traffic/Twingraph.js';
import ClockManager from'./Utilities/ClockManager.js';
import HtmlManager from './Utilities/HtmlManager.js'


window.onload = setup;

var measure;
var viewer;
const buildingLayer = new BuildingLayer();
const eventlayer = new  EventLayer();

function setup() {
    const west = 5.798212900532118;
    const south = 53.19304584690279;
    const east = 5.798212900532118;
    const north = 53.19304584690279;

    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.0005;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

    // Sets up a list which is used to select an imagery provider
    const imageryViewModels = [];
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name: "OpenStreetMap",
        iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/openStreetMap.png"),
        tooltip: "OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.\nhttp://www.openstreetmap.org",
        creationFunction: function() {
            return new Cesium.OpenStreetMapImageryProvider({
                url: "https://tile.openstreetmap.org/"
            });
        }
    }));

    // Sets up the container in which the globe is displayed
    viewer = new Cesium.Viewer('cesiumContainer', {
        baseLayer: false,
        baseLayerPicker: false,
        geocoder: false,
        mapProjection: new Cesium.WebMercatorProjection(Cesium.Ellipsoid.WGS84)
    });

    // Sets up an invisible layer picker, which sets the correct layer to use
    const baseLayerPicker = new Cesium.BaseLayerPicker("baseLayerPickerContainer", {
        globe: viewer.scene.globe,
        imageryProviderViewModels: imageryViewModels
    });

    fetchBuildingData().then(data => {
        data.forEach(building => {
            const { id, latitude, longitude, functie, capaciteit, isOpen } = building;
            const buildingObj = new Building(id, { x: latitude, y: longitude }, functie, capaciteit, isOpen);
            buildingLayer.addBuilding(buildingObj);
        });
        buildingLayer.getBuildings(createBuilding);
    });

    
    fetchEventData().then(data =>{
        data.forEach(event => {
            const{id,name,startDateEvent,endDateEvent,description} = event;
             const eventObj = new Event(id,name,description, startDateEvent,endDateEvent);
             eventlayer.addEvent(eventObj);
        })
    })
    
    // Removes credit?
    viewer.creditDisplay.removeStaticCredit(Cesium.CreditDisplay._cesiumCredit);

    // Improves tile quality
    viewer.scene.globe.maximumScreenSpaceError = 1;
   
    measure = createBox(0, 0, 3, 3, 30, 0, Cesium.Color.RED);

    var carX = 230;
    var carY = 78;


    function moveCar() {
        carX++;
        carY += 0.35;
        moveEntity(car, carX, carY);
        setTimeout(() => {
            moveCar();
        }, 150);
    }

    //moveCar();

    const RoadGraph = new Twingraph(Roadnodes, RoadEdges, "road", 50);
    //const cylceGraph = new Twingraph(cycleNodes, cycleEdges, "cycle", 30);

    RoadGraph.SetupGraph(createPolygonFromXYs, Cesium.Color.WHITE);
    //cylceGraph.SetupGraph(createPolygonFromXYs, Cesium.Color.RED);

    RoadGraph.initTrafficLights();
    RoadGraph.startTrafficLights(createBox)

    const car = createBox(0, 0, 5, 2, 1.5, 0, Cesium.Color.RED);
    const car2 = createBox(0, 0, 5, 2, 1.5, 0, Cesium.Color.PURPLE);
    const car3 = createBox(0, 0, 5, 2, 1.5, 0, Cesium.Color.BLUE);

    RoadGraph.moveCarRandomly(car, 4,moveEntity);
    RoadGraph.moveCarRandomly(car2, 1, moveEntity);
    RoadGraph.moveCarRandomly(car3, 12, moveEntity);

    const redPolygon = viewer.entities.add({
        name: "Spoordok",
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                5.787759928698073, 53.197831145908,
                5.789123554275904, 53.19763995957844,
                5.788934967759822, 53.19602353198474,
                5.776937964005922, 53.194528716741345,
                5.774587885853288, 53.196901277127026,
                5.774703939093954, 53.1976225789762,
                5.786410809746187, 53.19704032421097,
            ]),
            material: Cesium.Color.LIGHTGRAY,
        },
    });
    
    setupClickHandler();
    const htmlmanager  = new HtmlManager();
    htmlmanager.createButtons([
    { label: 'Close Buildings', action: () => buildingLayer.closeBuildings()},
    { label: 'Open Buildings', action: () => buildingLayer.openBuildings() },
    { label: 'Add Building', action: () => htmlmanager.createBuildingForm(addBuilding) },
    {label:'Add Event', action: () => htmlmanager.createEventForm(addEvent)}
    ]);

    const clockManager = new ClockManager(viewer, buildingLayer, eventlayer);
    clockManager.init(createEvent);
}

//latitude = x
//longitude = y
const top_right_lat = 5.77465380114684;
const top_left_lon = 53.194528716741345;

function latlonFromXY(x, y) {
    var coef_x = x / 111320.0;
    var new_lat = top_right_lat + coef_x;
    var coef_y = y / 111320.0;
    var new_long = top_left_lon + coef_y / Math.cos(top_right_lat * 0.01745);
    return { "lat": new_lat, "lon": new_long };
}

var _box = 1;

function createBox(x, y, width, depth, height, rotation, color, description) {
    const cords = latlonFromXY(x, y);
    return viewer.entities.add({
        name: "Box_" + _box++,
        position: Cesium.Cartesian3.fromDegrees(cords.lat, cords.lon, height / 2.0),
        box: {
            dimensions: new Cesium.Cartesian3(width, depth, height),
            material: color,
        },
        description: description
    });
}

function createBuilding(x, y, width, depth, height, rotation, color, description,id) {
    const cords = latlonFromXY(x, y);
    return viewer.entities.add({
        name: "Building_" + id,
        position: Cesium.Cartesian3.fromDegrees(cords.lat, cords.lon, height / 2.0),
        box: {
            dimensions: new Cesium.Cartesian3(width, depth, height),
            material: color,
        },
        description: description
    });
}

function createEvent(x, y, width, depth, height, rotation, color, description,id) {
    const cords = latlonFromXY(x, y);
    return viewer.entities.add({
        name: "Event_" + id,
        position: Cesium.Cartesian3.fromDegrees(cords.lat, cords.lon, height / 2.0),
        box: {
            dimensions: new Cesium.Cartesian3(width, depth, height),
            material: color,
        },
        description: description
    });
}

function moveEntity(entity, x, y) {
    const cords = latlonFromXY(x, y);
    entity.position = Cesium.Cartesian3.fromDegrees(cords.lat, cords.lon, entity.box.dimensions._value.z);
}


var _polygon = 1;

function createPolygonFromXYs(xyArray, color) {
    var degreeArray = [];
    xyArray.forEach(element => {
        const cords = latlonFromXY(element[0], element[1]);
        degreeArray.push(cords.lat);
        degreeArray.push(cords.lon);
    });

    viewer.entities.add({
        name: "Polygon_" + _polygon++,
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(degreeArray),
            material: color,
        },
    });
}

// Setup handler for box clicks
function setupClickHandler() {
    viewer.selectedEntityChanged.addEventListener((selectedEntity) => {
        if (selectedEntity && selectedEntity.name && selectedEntity.name.startsWith("Building_")) {
            update(selectedEntity);
            // htmlcode.createButtons([{label: "remove building", action: () => removeBuilding(selectedEntity.id,selectedEntity)}])
        } else {
            // removeButtons();
        }
    });
}

function update(entity)
{
    const buildingId = entity.name.split("_")[1]; // Extract building ID from entity name
    const selectedBuilding = buildingLayer.buildings.find(building => building.id === parseInt(buildingId));
    // Update the description with the latest information
    if (selectedBuilding) {
        entity.description = selectedBuilding.getInfo();  // Get the info for the selected building
    }
}

// Remove buttons when no entity is selected
function removeButtons() {
    const existingContainer = document.getElementById("button-container");
    if (existingContainer) {
        existingContainer.remove();
    }
}

//haalt de buildings gegevens op en slaat ze op in een json bestand
async function fetchBuildingData() {
    const response = await fetch("http://localhost:8080/api/buildings"); 
    return response.json();
}
// haalt de events gegevens op en slaat ze op in een json bestand
async function fetchEventData() {
    const response = await fetch("http://localhost:8080/api/events"); 
    return response.json();
}

async function addBuilding() {
    // Collect form data
    const buildingData = {
        latitude: parseFloat(document.getElementById("latitude").value),
        longitude: parseFloat(document.getElementById("longitude").value),
        functie: document.getElementById("functie").value,
        capaciteit: parseInt(document.getElementById("capaciteit").value),
        isOpen: document.getElementById("isOpen").checked,
    };

    try {
        const response = await fetch("http://localhost:8080/api/buildings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(buildingData),
        });

        if (response.ok) {
            const savedBuilding = await response.json();
            console.log("Building saved successfully:", savedBuilding);

            // Use savedBuilding data to create building object
            const buildingObje = new Building(
                savedBuilding.id, // Assuming 'id' is returned in the response
                { x: savedBuilding.latitude, y: savedBuilding.longitude },
                savedBuilding.functie,
                savedBuilding.capaciteit,
                savedBuilding.isOpen
            );

            // Add the building to the building layer
            buildingLayer.addBuilding(buildingObje);
            buildingObje.displayOnMap(createBuilding); // Function to display building on the map

            // Remove the form after successful submission
            const formContainer = document.getElementById('form-container');
            if (formContainer) {
                formContainer.remove(); // Remove the form container from the DOM
            }
        } else {
            console.error("Failed to save building:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function addEvent() {
    const eventData = {
        name: document.getElementById("name").value,  
        description: document.getElementById("description").value, 
        beginDate: document.getElementById("beginDate").value,
        endDate: document.getElementById("endDate").value,
    };

    try {
        const response = await fetch("http://localhost:8080/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            const savedEvent = await response.json();
            console.log("Event saved successfully:", savedEvent);

            // Remove the form after successful submission
            const formContainer = document.getElementById('form-container');
            if (formContainer) {
                formContainer.remove(); // Remove the form container from the DOM
            }
        } else {
            console.error("Failed to save event:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function removeBuilding(buildingId, selectedEntity) {
    try {
        const response = await fetch(`http://localhost:8080/api/buildings/${buildingId}`, {
            method: "DELETE",
            headers: {
                       "Content-Type": "application/json",},
        });

        if (response.ok) {
            console.log("Building removed successfully");
            // Remove the building from the Cesium map
            viewer.entities.remove(selectedEntity); // This removes the entity from the map
        } else {
            console.error(`Failed to remove building: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

//sets up list of edges for road graph
const RoadEdges = [
    {firstId: 1, secondId: 3, traffic: 30},
    {firstId: 2, secondId: 3, traffic: 30},
    {firstId: 3, secondId: 4, traffic: 30},
    {firstId: 3, secondId: 22, traffic: 30},
    {firstId: 4, secondId: 5, traffic: 30},
    {firstId: 4, secondId: 19, traffic: 30},
    {firstId: 5, secondId: 6, traffic: 30},
    {firstId: 5, secondId: 11, traffic: 30},
    {firstId: 6, secondId: 7, traffic: 30},
    {firstId: 6, secondId: 21, traffic: 30},
    {firstId: 7, secondId: 8, traffic: 30},
    {firstId: 7, secondId: 13, traffic: 30},
    {firstId: 8, secondId: 9, traffic: 30},
    {firstId: 8, secondId: 24, traffic: 30},
    {firstId: 9, secondId: 10, traffic: 30},
    {firstId: 9, secondId: 12, traffic: 30},
    {firstId: 13, secondId: 14, traffic: 30},
    {firstId: 13, secondId: 15, traffic: 30},
    {firstId: 14, secondId: 16, traffic: 30},
    {firstId: 14, secondId: 17, traffic: 30},
    {firstId: 18, secondId: 19, traffic: 30},
    {firstId: 19, secondId: 20, traffic: 30},
    {firstId: 21, secondId: 22, traffic: 30},
    {firstId: 21, secondId: 24, traffic: 30},
    {firstId: 22, secondId: 23, traffic: 30},
    {firstId: 23, secondId: 24, traffic: 30},
    {firstId: 23, secondId: 25, traffic: 30},
    {firstId: 25, secondId: 26, traffic: 30},
    ];

    //sets up list of nodes for road graph
    const Roadnodes = [
          { ID: 1, point1: [1600, 265], point2: [1600, 270]},
          { ID: 2, point1: [1600, 255], point2: [1600, 260]},
          { ID: 3, point1: [1400, 255], point2:[1400, 260]},
          { ID: 4, point1: [1095, 180], point2: [1100, 185]},
          { ID: 5, point1: [675, 180], point2: [670, 185]},
          { ID: 6, point1: [570, 180], point2: [575, 185]},
          { ID: 7, point1: [385, 180], point2: [390, 185]},
          { ID: 8, point1: [225, 180], point2: [230, 185]},
          { ID: 9, point1: [170, 180], point2: [175, 185]},
          { ID: 10, point1: [75, 180], point2: [70, 185]},
          { ID: 11, point1: [675, 130], point2: [670, 130]},
          { ID: 12, point1: [88, 165], point2: [93, 170]},
          { ID: 13, point1: [385, 105], point2: [390, 110]},
          { ID: 14, point1: [385, 95], point2: [390, 100]},
          { ID: 15, point1: [190, 64], point2: [185, 67]},
          { ID: 16, point1: [205, 54], point2: [200, 57]},
          { ID: 17, point1: [385, 30], point2: [390, 27]},
          { ID: 18, point1: [240, 11], point2: [235, 8]},
          { ID: 19, point1: [1095, 114], point2: [1100, 111]},
          { ID: 20, point1: [1200, 126], point2: [1200, 123]},
          { ID: 21, point1: [570, 240], point2: [575, 245]},
          { ID: 22, point1: [570, 290], point2: [575, 295]},
          { ID: 23, point1: [225, 305], point2: [230, 310]},
          { ID: 24, point1: [225, 240], point2: [230, 245]},
          { ID: 25, point1: [175, 308], point2: [180, 312]},
          { ID: 26, point1: [3, 325], point2: [3, 330]},
    ];
    
    //sets up list of edges for cycle graph
    const cycleEdges = [
        {firstId: 1, secondId: 3},
        {firstId: 2, secondId: 4},
        {firstId: 3, secondId: 4},
        {firstId: 3, secondId: 9},
        {firstId: 3, secondId: 10},
        {firstId: 3, secondId: 16},
        {firstId: 4, secondId: 6},
        {firstId: 6, secondId: 7},
        {firstId: 6, secondId: 11},
        {firstId: 7, secondId: 8},
        {firstId: 8, secondId: 9},
        {firstId: 8, secondId: 13},
        {firstId: 11, secondId: 12},
        {firstId: 11, secondId: 15},
        {firstId: 13, secondId: 14},
        {firstId: 13, secondId: 16},
        {firstId: 14, secondId: 15},
        {firstId: 14, secondId: 18},
        {firstId: 15, secondId: 19},
        {firstId: 16, secondId: 17},
        {firstId: 17, secondId: 18},
        {firstId: 17, secondId: 22},
        {firstId: 18, secondId: 19},
        {firstId: 19, secondId: 20},
        {firstId: 20, secondId: 21},
    ];

    //sets up list of nodes for cycle graph
    const cycleNodes = [
        { ID: 1, point1: [1600, 272], point2: [1600, 274]},
        { ID: 2, point1: [1600, 250], point2: [1600, 252]},
        { ID: 3, point1: [1400, 265], point2: [1403, 267]},
        { ID: 4, point1: [1400, 250], point2: [1403, 252]},
        { ID: 5, point1: [1400, 263], point2: [1400, 261]},
        { ID: 6, point1: [1103, 175], point2: [1103, 177]},
        { ID: 7, point1: [783, 175], point2: [780, 177]},
        { ID: 8, point1: [783, 233], point2: [780, 235]},
        { ID: 9, point1: [1103, 233], point2: [1100, 235]},
        { ID: 10, point1: [1470, 365], point2: [1473, 363]},
        { ID: 11, point1: [678, 175], point2: [681, 177]},
        { ID: 12, point1: [678, 130], point2: [681, 130]},
        { ID: 13, point1: [567, 279], point2: [565, 281]},
        { ID: 14, point1: [567, 250], point2: [564, 247]},
        { ID: 15, point1: [567, 175], point2: [564, 177]},
        { ID: 16, point1: [567, 310], point2: [564, 313]},
        { ID: 17, point1: [214, 328], point2: [217, 330]},
        { ID: 18, point1: [214, 250], point2: [217, 247]},
        { ID: 19, point1: [214, 175], point2: [217, 177]},
        { ID: 20, point1: [175, 175], point2: [170, 177]},
        { ID: 21, point1: [98, 156], point2: [96, 158]},
        { ID: 22, point1: [6, 337], point2: [6, 340]},
    ];















