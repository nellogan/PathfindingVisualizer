import {euclideanDistance} from './util/euclideanDistance.js'
import {updateNeighborsGreedy} from './util/updateNeighborsGreedy.js'
import {sortNodesByFScore} from './util/sortNodesByFScore.js'

// Greedy best first search f(n)= h(n) = euclideanDistance(node,finishNode) + node.weight
export function gbfs(grid, startNode, finishNode)
{
  const openList = [startNode];
  const closedList = [];
  const neighborList = [];
  startNode.fscore = euclideanDistance(startNode, finishNode);
  let node = null;
  while (openList.length)
  {
    sortNodesByFScore(openList);
    node = openList.shift();
    node.isVisited = true;
    if (node.isWall) { continue }
    closedList.push(node);
    if (node.isFinish) { closedList[closedList.length-1]=[finishNode]; return [closedList, neighborList]; }
    updateNeighborsGreedy(grid, node, finishNode, openList, neighborList);
  }
  return [closedList, neighborList];
}