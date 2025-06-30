class ClockManager {
    constructor(viewer, buildingLayer, eventLayer) {
        this.viewer = viewer;
        this.buildingLayer = buildingLayer;
        this.eventLayer = eventLayer;
        this.triggered = false;
    }

    init(createEvent) {
        this._handleTimeEvents();
        this._handleDateEvents(createEvent);
    }

    _handleTimeEvents() {
        this.viewer.clock.onTick.addEventListener(() => {
            const currentTime = this.viewer.clock.currentTime;
            const date = Cesium.JulianDate.toDate(currentTime);
            const hours = date.getUTCHours();

            if ((hours === 8 || hours === 18) && !this.triggered) {
                if (hours === 8) {
                    this.buildingLayer.openBuildings();
                } else if (hours === 18) {
                    this.buildingLayer.closeBuildings();
                }
                this.triggered = true;
            }

            if (hours !== 8 && hours !== 18) {
                this.triggered = false;
            }
        });
    }

    _handleDateEvents(createEvent) {
        this.viewer.clock.onTick.addEventListener(() => {
            const currentTime = this.viewer.clock.currentTime;
            const date = Cesium.JulianDate.toDate(currentTime).toISOString().split('T')[0];
    
            this.eventLayer.events.forEach(event => {
                if (date === event.begindate && !event.triggered) {
                    // Display only the matching event
                    this.eventLayer.getEvents(createEvent, e => e.id === event.id);
                    event.triggered = true;
                    console.log(`Event "${event.name}" has started.`);
                }
    
                if (date === event.endDate && event.triggered) {
                    if (event.entity) {
                        this.viewer.entities.remove(event.entity);
                        event.entity = null;
                    }
                    event.triggered = false;
                    console.log(`Event "${event.name}" has ended.`);
                }
            });
        });
    }
}
export default ClockManager;
