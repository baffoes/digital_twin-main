class Twingraph {
    constructor(nodes, edges, type, busyness, color) {
        this.nodes = nodes;
        this.edges = edges;
        this.type = type;
        this.busyness = busyness;
        this.color = color;

        // Build node lookup map for O(1) access
        this.nodeMap = this.buildNodeMap();
        this.adjacencyMap = this.buildAdjacencyMap();
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

    moveCarAlongPath(car, path, moveEntityCallback) {
    let currentIndex = 0;
    let nextIndex = 1;
    let progress = 0;
    const steps = 20;
    const targetFrameTime = 200; // Match original 105ms timing

    // Validate path
    if (!path || path.length < 2) {
        console.error('Invalid path:', path);
        return;
    }

    const step = (timestamp) => {
        // Prevent execution if path is complete
        if (nextIndex >= path.length) {
            moveEntityCallback(car, -9999, -9999);

            // Respawn after 5 seconds
            setTimeout(() => {
                currentIndex = 0;
                nextIndex = 1;
                progress = 0;
                requestAnimationFrame(step);
            }, 5000);
            return;
        }

        const current = path[currentIndex];
        const next = path[nextIndex];

        // Validate coordinates

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

        // Schedule next frame
        requestAnimationFrame((nextTimestamp) => {
            // Approximate 105ms timing
            if (nextTimestamp - timestamp >= targetFrameTime) {
                step(nextTimestamp);
            } else {
                setTimeout(() => step(nextTimestamp), targetFrameTime - (nextTimestamp - timestamp));
            }
        });
    };

    requestAnimationFrame(step);
}

    startCar(car, startId, endId, moveEntityCallback) {
        const idPath = this.findPath(startId, endId);
        if (!idPath) {
            console.error(`No path found between ${startId} and ${endId}`);
            return;
        }

        const coordinatePath = this.buildCoordinatePath(idPath);
        this.moveCarAlongPath(car, coordinatePath, moveEntityCallback);
    }
}

export default Twingraph;