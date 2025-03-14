import animateShortestPath from "./animateShortestPath.js";

export default function animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPathOrder, graphRefs) {
    let visitedOrInQueueAnimationIds = [];
    let pendingAnimationIds = {
        visitedOrInQueue: null,
        initialShortestPath: null,
        shortestPathElements: null
    };

    let timeoutId = null;
    /* Skip the start node (first node). */
    for ( let i=0; i<visitedNodes.length; i++ ) {
        if ( i === visitedNodes.length-1 ) {
            pendingAnimationIds.visitedOrInQueue = visitedOrInQueueAnimationIds;

            pendingAnimationIds.initialShortestPath = setTimeout(() => {
                pendingAnimationIds.shortestPathElements = animateShortestPath(nodesInShortestPathOrder, graphRefs);
            }, 10 * i);
            return pendingAnimationIds;
        };

        function paintVisitedOrInQueue() {
            const node = visitedNodes[i];
            const nodeNeighbors = neighborsQueue[i];
            for ( let k=0; k<nodeNeighbors.length; k++ ) {
                if ( nodeNeighbors[k].start || nodeNeighbors[k].finish ) { continue; }
                graphRefs[nodeNeighbors[k].row][nodeNeighbors[k].col].current.className = "node node-queue";
            };
            if ( !node.start && !node.finish) { graphRefs[node.row][node.col].current.className = "node node-visited"; }
        };

        timeoutId = setTimeout(paintVisitedOrInQueue, 10 * i);
        visitedOrInQueueAnimationIds.push(timeoutId);
    };
}