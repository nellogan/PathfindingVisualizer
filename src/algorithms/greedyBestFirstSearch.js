import euclideanDistance from "./utils/euclideanDistance.js";
import chebyshevDistance from "./utils/chebyshevDistance.js";
import manhattanDistance from "./utils/manhattanDistance.js";
import getNeighbors from "./utils/getNeighbors.js";
import sortNodesByFScore from "./utils/sortNodesByFScore.js";

/* Greedy best first search f(n) = h(n), where h is the heuristic function (distance from  neighbor node to finish
node). */
export default function greedyBestFirstSearch(grid, startNode, finishNode) {
    const openList = [startNode];
    const closedList = [];
    const neighborList = [];
    const preferredHeuristicFn = euclideanDistance; /* Try changing to chebyshevDistance or manhattanDistance. */
    startNode.fscore = preferredHeuristicFn(startNode, finishNode);
    let node = null;
    while ( openList.length ) {
        sortNodesByFScore(openList);
        node = openList.shift();
        if ( node.wall ) { continue; }
        node.visited = true;
        closedList.push(node);
        node.queue = false;
        if ( node.finish ) {
            return [closedList, neighborList];
        }
        let neighbors = getNeighbors(grid, node);
        let nList = [];
        for ( let neighbor of neighbors ) {
            let tempFScore = preferredHeuristicFn(neighbor, finishNode) + neighbor.weight;
            if ( tempFScore < neighbor.fscore ) {
                neighbor.fscore = tempFScore;
                neighbor.previousNode = node;
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
