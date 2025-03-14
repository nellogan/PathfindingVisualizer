import getNeighbors from "./utils/getNeighbors.js";
import sortNodesByGScore from "./utils/sortNodesByGScore.js";

/* dijkstra search f(n) = g(n), where g is cost from start node. */
export default function dijkstra(grid, startNode, finishNode) {
    const openList = [startNode];
    const closedList = [];
    const neighborList = [];
    startNode.gscore = 0;
    let node = null;
    while ( openList.length ) {
        sortNodesByGScore(openList);
        node = openList.shift();
        node.visited = true;
        if ( node.wall ) { continue; }
        closedList.push(node);
        node.queue = false;
        if ( node.finish ) {
            return [closedList, neighborList];
        }
        let neighbors = getNeighbors(grid, node);
        let nList = [];
        for ( let neighbor of neighbors ) {
            let tempGScore = node.gscore + neighbor.weight;
            if ( tempGScore < neighbor.gscore ) {
                neighbor.previousNode = node;
                neighbor.gscore = tempGScore;
                if ( !openList.includes(neighbor) ) {
                    openList.push(neighbor);
                    nList.push(neighbor);
                    neighbor.queue = true;
                }
            }
        }
         neighborList.push(nList);
    }
    return [closedList, neighborList];
}
