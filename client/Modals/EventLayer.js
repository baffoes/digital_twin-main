class EventLayer{
    constructor(){
        this.events = []
    }

    addEvent(event) {
        this.events.push(event);
        console.log("Event added:", event.getInfo());
    }

    getEvents(createBoxFunction, filterCondition = null) {
        this.events.forEach(event => {
            // If a filter condition is provided, only display matching events
            if (!filterCondition || filterCondition(event)) {
                event.displayEvent(createBoxFunction);
            }
        });
    }
}
export default EventLayer;