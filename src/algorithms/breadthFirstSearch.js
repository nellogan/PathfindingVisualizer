import getNeighbors from "./utils/getNeighbors.js";

export default function breadthFirstSearch(grid,startNode, finishNode) {
    const openList = [startNode];
    const closedList=[];
    const neighborList = [];
    let node = null;
    while ( openList.length ) {
        node = openList.shift();
        node.visited = true;
        if ( node.wall ) { continue; }
        closedList.push(node);
        node.queue = false;
        if ( node.finish ) { return [closedList, neighborList]; }
        bfsHelperBFS(grid, node, finishNode, openList, neighborList, closedList);
    }

    return [closedList, neighborList];
}

function bfsHelperBFS(grid, node, finishNode, openList, neighborList, closedList) {
    const neighbors = getNeighbors(grid, node);
    const nList = [];
    for ( let neighbor of neighbors ) {
        neighbor.previousNode = node;
        if ( !openList.includes(neighbor) && !closedList.includes(neighbor) ) {
            openList.push(neighbor);
            nList.push(neighbor);
            neighbor.queue = true;
        }
    }
    neighborList.push(nList);
}
