import getNeighbors from "./utils/getNeighbors.js";

export default function depthFirstSearch(graph,startNode, finishNode) {
    const closedList = [];
    const neighborList = [];
    dfsHelper(graph, startNode, finishNode, closedList, neighborList);
    return [closedList, neighborList];
}

function dfsHelper(graph, node, finishNode, closedList, neighborList) {
    closedList.push(node);
    node.visited = true;
    if ( node.finish ) { return true; }
    node.queue = false;
    const neighbors = getNeighbors(graph, node);
    if ( neighbors.length ) {
        for ( let i=0; i<neighbors.length; i++ ) {
            if ( closedList.includes(neighbors[i]) ) { continue; }
            neighborList.push([neighbors[i]]);
            neighbors[i].queue = true;
            neighbors[i].previousNode = node;
            if ( dfsHelper(graph, neighbors[i], finishNode, closedList, neighborList) ) { return true; }
        }
    }
    return false;
}