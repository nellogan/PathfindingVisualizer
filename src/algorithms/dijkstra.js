import {updateNeighbors} from './util/updateNeighbors.js'
import {sortNodesByGScore} from './util/sortNodesByGScore.js'

export function dijkstra(grid, startNode, finishNode)
{
  const openList = [startNode];
  const closedList = [];
  const neighborList = [];
  startNode.gscore = 0;
  let node = null;
  while (openList.length)
  {
    sortNodesByGScore(openList);
    node = openList.shift();
    node.isVisited = true;
    if (node.isWall) { continue }
    closedList.push(node);
    if (node.isFinish) { closedList[closedList.length-1]=[finishNode]; return [closedList,neighborList]; }
    updateNeighbors(grid, node, finishNode, openList, neighborList);
  }
  return [closedList, neighborList];
}