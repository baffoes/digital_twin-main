class Event{
    constructor(_id,_name,_description,_beginDate,_endDate){
        this.id = _id
        this.name = _name;
        this.discription = _description;
        this.begindate = _beginDate;
        this.endDate = _endDate;
        this.triggered = false;
        this.entity = null;
    }

    getInfo() {
        let info = `
        Event Name: ${this.name} <br>
        Event Description: ${this.discription} <br>
        Start Date: ${this.begindate} <br>
        End Date: ${this.endDate} <br>
        `;
        return info;
    }


    displayEvent(createBoxFunction){
        this.entity = createBoxFunction(1525,310,65,65,30,0,Cesium.Color.ORANGE, this.getInfo(),this.id)
    }    

    

}
export default Event;