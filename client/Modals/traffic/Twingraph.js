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


    moveCarRandomly(car, currentNodeId, moveEntityCallback) {
    let currentIndex = 0;
    let nextIndex = 1;
    let progress = 0;
    const steps = 20;
    const targetFrameTime = 200;

    // Recursive step function for one edge travel
    const stepAlongEdge = (pathCoords) => {
        if (nextIndex >= pathCoords.length) {
            // Arrived at next node
            currentNodeId = this.getNodeIdByCoords(pathCoords[nextIndex - 1]);

            // Pick a random neighbor to go next
            const neighbors = this.adjacencyMap[currentNodeId];
            if (!neighbors || neighbors.length === 0) {
                // Dead end: wait and restart or stop
                setTimeout(() => this.moveCarRandomly(car, currentNodeId, moveEntityCallback), 5000);
                return;
            }
            const nextNodeId = neighbors[Math.floor(Math.random() * neighbors.length)];

            // Build path for next edge (two points)
            const newPathCoords = [
                this.nodeMap[currentNodeId].point2,
                this.nodeMap[nextNodeId].point2
            ];

            // Reset indices & progress
            currentIndex = 0;
            nextIndex = 1;
            progress = 0;

            // Continue moving on next edge
            stepAlongEdge(newPathCoords);
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
            setTimeout(() => stepAlongEdge(pathCoords), targetFrameTime);
        });
    };

    // Start with initial edge from currentNodeId to random neighbor
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

    stepAlongEdge(initialPathCoords);
 }

// Helper to get node ID by coordinates (point2)
 getNodeIdByCoords(coords) {
    for (const nodeId in this.nodeMap) {
        const node = this.nodeMap[nodeId];
        if (node.point2[0] === coords[0] && node.point2[1] === coords[1]) {
            return nodeId;
        }
    }
    return null;
 }

}

export default Twingraph;