class Twingraph {
    constructor(nodes, edges, type, busyness, color) {
        this.nodes = nodes;
        this.edges = edges;
        this.type = type;
        this.busyness = busyness;
        this.color = color;

        this.nodeMap = this.buildNodeMap();
        this.adjacencyMap = this.buildAdjacencyMap();

        this.trafficLights = {}; 
        this.trafficLightCycle = ['green', 'yellow', 'red'];
        this.trafficLightDurations = { green: 5000, yellow: 2000, red: 5000 };

        this.trafficLightEntities = {}; // Store Cesium entities for traffic lights
    }

    buildNodeMap() {
        const map = {};
        for (const node of this.nodes) {
            map[node.ID] = node;
        }
        return map;
    }

    getInfo(node1, node2) {
        return `node1: ${node1.ID}, <br>
                node2: ${node2.ID}, <br>
                type: ${this.type}, <br>
                busyness: ${this.busyness}`;
    }

    SetupGraph(edgeDisplay, TwinColor) {
        for (const edgeData of this.edges) {
            const firstNode = this.nodeMap[edgeData.firstId];
            const secondNode = this.nodeMap[edgeData.secondId];

            if (firstNode && secondNode) {
                edgeDisplay(
                    [firstNode.point1, firstNode.point2, secondNode.point2, secondNode.point1],
                    TwinColor,
                    this.getInfo(firstNode, secondNode)
                );
            }
        }
    }

    buildAdjacencyMap() {
        const map = {};
        for (const edge of this.edges) {
            if (!map[edge.firstId]) map[edge.firstId] = [];
            if (!map[edge.secondId]) map[edge.secondId] = [];
            map[edge.firstId].push(edge.secondId);
            map[edge.secondId].push(edge.firstId);
        }
        return map;
    }

    findPath(startId, endId) {
        const queue = [{ node: startId, path: [startId] }];
        const visited = new Set([startId]);

        while (queue.length > 0) {
            const { node, path } = queue.shift();

            if (node === endId) return path;

            const neighbors = this.adjacencyMap[node] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push({ node: neighbor, path: [...path, neighbor] });
                }
            }
        }

        return null;
    }

    buildCoordinatePath(idPath) {
        return idPath.map(id => this.nodeMap[id]?.point2).filter(Boolean);
    }

    moveCarRandomly(car, currentNodeId, moveEntityCallback) {
        let currentIndex = 0;
        let nextIndex = 1;
        let progress = 0;
        const steps = 20;
        const targetFrameTime = 200;

        const stepAlongEdge = (pathCoords, fromNodeId) => {
            // Check traffic light at fromNodeId before moving forward
            const lightState = this.getTrafficLightState(fromNodeId);

            if (progress === 19 && lightState === 'red') {
                // Wait and re-check after 500ms
                setTimeout(() => stepAlongEdge(pathCoords, fromNodeId), 500);
                return;
            }
            // If green or yellow, continue movement along edge

            if (nextIndex >= pathCoords.length) {
                // Arrived at next node
                currentNodeId = this.getNodeIdByCoords(pathCoords[nextIndex - 1]);

                // Pick a random neighbor to go next
                const neighbors = this.adjacencyMap[currentNodeId];
                if (!neighbors || neighbors.length === 0) {
                    setTimeout(() => this.moveCarRandomly(car, currentNodeId, moveEntityCallback), 5000);
                    return;
                }
                const nextNodeId = neighbors[Math.floor(Math.random() * neighbors.length)];

                const newPathCoords = [
                    this.nodeMap[currentNodeId].point2,
                    this.nodeMap[nextNodeId].point2
                ];

                currentIndex = 0;
                nextIndex = 1;
                progress = 0;

                // Continue moving on next edge, checking traffic light at currentNodeId
                stepAlongEdge(newPathCoords, currentNodeId);
                return;
            }

            const current = pathCoords[currentIndex];
            const next = pathCoords[nextIndex];

            const t = progress / steps;
            const x = current[0] + (next[0] - current[0]) * t;
            const y = current[1] + (next[1] - current[1]) * t;

            moveEntityCallback(car, x, y);

            progress++;
            if (progress > steps) {
                progress = 0;
                currentIndex++;
                nextIndex++;
            }

            requestAnimationFrame(stepTimestamp => {
                setTimeout(() => stepAlongEdge(pathCoords, fromNodeId), targetFrameTime);
            });
        };

        const neighbors = this.adjacencyMap[currentNodeId];
        if (!neighbors || neighbors.length === 0) {
            console.error('No neighbors to move to from node', currentNodeId);
            return;
        }
        const nextNodeId = neighbors[Math.floor(Math.random() * neighbors.length)];
        const initialPathCoords = [
            this.nodeMap[currentNodeId].point2,
            this.nodeMap[nextNodeId].point2
        ];

        stepAlongEdge(initialPathCoords, currentNodeId);
    }

    getNodeIdByCoords(coords) {
        for (const nodeId in this.nodeMap) {
            const node = this.nodeMap[nodeId];
            if (node.point2[0] === coords[0] && node.point2[1] === coords[1]) {
                return nodeId;
            }
        }
        return null;
    }

    initTrafficLights() {
    for (const nodeId in this.nodeMap) {
        if ((this.adjacencyMap[nodeId]?.length ?? 0) > 1) {
            const randomState = this.trafficLightCycle[
                Math.floor(Math.random() * this.trafficLightCycle.length)
            ];
            this.trafficLights[nodeId] = {
                state: randomState,
                timeoutId: null,
            };
        }
    }
   }


    startTrafficLights(createBox) {
        for (const nodeId in this.trafficLights) {
            const light = this.trafficLights[nodeId];
            const node = this.nodeMap[nodeId];
            const colorMap = {
                red: Cesium.Color.RED,
                yellow: Cesium.Color.YELLOW,
                green: Cesium.Color.GREEN,
            };
            // create initial box and store the entity reference
            this.trafficLightEntities[nodeId] = createBox(
                node.point2[0],
                node.point2[1],
                1,
                2,
                1.5,
                0,
                colorMap[light.state]
            );
            this.cycleTrafficLight(nodeId, createBox);
        }
    }

    cycleTrafficLight(nodeId, createBox) {
        const light = this.trafficLights[nodeId];
        if (!light) return;

        const cycleOrder = ['green', 'yellow', 'red'];
        const durations = { green: 5000, yellow: 2000, red: 5000 };

        let currentIndex = cycleOrder.indexOf(light.state);
        currentIndex = (currentIndex + 1) % cycleOrder.length;
        light.state = cycleOrder[currentIndex];

        const colorMap = {
            red: Cesium.Color.RED,
            yellow: Cesium.Color.YELLOW,
            green: Cesium.Color.GREEN,
        };

        const entity = this.trafficLightEntities[nodeId];
        if (entity && entity.box) {
            // Update material color for the box entity
            entity.box.material = colorMap[light.state];
        } else if (entity && entity.material) {
            // fallback if entity has color property
            entity.material = colorMap[light.state];
        } else {
            // fallback: recreate the box entity
            const node = this.nodeMap[nodeId];
            if (!node) return;
            this.trafficLightEntities[nodeId] = createBox(
                node.point2[0],
                node.point2[1],
                1,
                2,
                1.5,
                0,
                colorMap[light.state]
            );
        }

        if (light.timeoutId) clearTimeout(light.timeoutId);
        light.timeoutId = setTimeout(() => {
            this.cycleTrafficLight(nodeId, createBox);
        }, durations[light.state]);
    }

    getTrafficLightState(nodeId) {
        return this.trafficLights[nodeId]?.state ?? 'green';
    }
}

export default Twingraph;
