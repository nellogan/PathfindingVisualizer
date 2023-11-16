import {euclideanDistance} from './util/euclideanDistance.js'
import {updateNeighbors} from './util/updateNeighbors.js'
import {sortNodesByFScore} from './util/sortNodesByFScore.js'

export function aStar(grid, startNode, finishNode)
{
  const openList = [startNode];
  const closedList = [];
  const neighborList = [];
  startNode.gscore = 0;
  startNode.fscore = euclideanDistance(startNode, finishNode);
  let node = null;
  while (openList.length)
  {
    sortNodesByFScore(openList);
    node = openList.shift();
    node.isVisited = true;
    if (node.isWall) { continue }
    closedList.push(node);
    if (node.isFinish) { closedList[closedList.length-1] = [finishNode]; return [closedList, neighborList]; }
    updateNeighbors(grid, node, finishNode, openList, neighborList);
  }
  return [closedList, neighborList];
}