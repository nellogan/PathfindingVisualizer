import euclideanDistance from "./utils/euclideanDistance.js";
import chebyshevDistance from "./utils/chebyshevDistance.js";
import manhattanDistance from "./utils/manhattanDistance.js";
import sortNodesByFScore from "./utils/sortNodesByFScore.js";
import getNeighbors from "./utils/getNeighbors.js";

/* A* search f(n) = g(n) + h(n), where g is cost from start node and where h is the heuristic function (distance from
neighbor node to finish node). */
export default function aStar(grid, startNode, finishNode) {
    const openList = [startNode];
    const closedList = [];
    const neighborList = [];
    const preferredHeuristicFn = euclideanDistance; /* Try changing to chebyshevDistance or manhattanDistance. */
    startNode.gscore = 0;
    startNode.fscore = preferredHeuristicFn(startNode, finishNode);
    let node = null;
    while ( openList.length ) {
        sortNodesByFScore(openList);
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
                neighbor.fscore = tempGScore + preferredHeuristicFn(neighbor, finishNode);
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
