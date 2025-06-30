class Car {
    constructor(_id, pathEdgeIds, snelheid, isActief, nodes, edges) {
        this.id = _id;
        this.pathEdgeIds = pathEdgeIds;
        this.currentEdgeIndex = 0;
        this.snelheid = snelheid;
        this.isActief = isActief;
        this.nodes = nodes;
        this.edges = edges;
        this.entity = null;

        const startEdge = this._getEdgeById(this.pathEdgeIds[0]);
        const startNode = this._getNodeById(startEdge.firstId);
        this.locatie = this._getNodeCenter(startNode);
    }

    _getEdgeById(id) {
        return this.edges.find(e => e.ID === id);
    }

    _getNodeById(id) {
        return this.nodes.find(n => n.ID === id);
    }

    _getNodeCenter(node) {
        const [x1, y1] = node.point1;
        const [x2, y2] = node.point2;
        return {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2,
        };
    }

    getInfo() {
        return `ID: ${this.id}<br>
        Locatie: (${this.locatie.x.toFixed(1)}, ${this.locatie.y.toFixed(1)})<br>
        Snelheid: ${this.snelheid} m/s<br>
        Actief: ${this.isActief ? 'Ja' : 'Nee'}`;
    }

    displayOnMap(createCar) {
        const { x, y } = this.locatie;
        const color = this.isActief ? Cesium.Color.GREEN : Cesium.Color.GRAY;
        this.entity = createCar(x, y, 10, 5, 3, 0, color, this.getInfo(), this.id);
    }

    moveCar(deltaTime) {
        if (!this.isActief || this.currentEdgeIndex >= this.pathEdgeIds.length) return;

        const edge = this._getEdgeById(this.pathEdgeIds[this.currentEdgeIndex]);
        const fromNode = this._getNodeById(edge.firstId);
        const toNode = this._getNodeById(edge.secondId);

        const from = this._getNodeCenter(fromNode);
        const to = this._getNodeCenter(toNode);

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.hypot(dx, dy);

        const directionX = dx / distance;
        const directionY = dy / distance;

        const moveDistance = this.snelheid * deltaTime;

        const remainingDistance = Math.hypot(to.x - this.locatie.x, to.y - this.locatie.y);

        if (moveDistance >= remainingDistance) {
            this.locatie = { ...to };
            this.currentEdgeIndex++;
        } else {
            this.locatie.x += directionX * moveDistance;
            this.locatie.y += directionY * moveDistance;
        }

        if (this.entity) {
            this.entity.position = Cesium.Cartesian3.fromDegrees(this.locatie.x, this.locatie.y);
            this.entity.description = this.getInfo();
        }
    }

    removeFromMap() {
        if (this.entity) {
            viewer.entities.remove(this.entity);
            this.entity = null;
        }
    }
}
