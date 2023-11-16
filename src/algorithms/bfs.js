import {getNeighbors} from './util/getNeighbors.js'

export function bfs(grid,startNode, finishNode)
{
  const openList = [startNode];
  const closedList=[];
  const neighborList = [];
  let node = null;
  while (openList.length)
  {
    node=openList.shift();
    node.isVisited = true;
    if (node.isWall) { continue }
    closedList.push(node);
    if (node.isFinish) { return [closedList, neighborList] }
    bfsHelperBFS(grid, node, finishNode, openList, neighborList);
  }
  return [closedList, neighborList];
}

function bfsHelperBFS(grid, node, finishNode, openList, neighborList)
{
  const neighbors = getNeighbors(grid, node);
  const nList = [];
  for (let neighbor of neighbors)
  {
    neighbor.previousNode = node;
    if (!openList.includes(neighbor)) {
      openList.push(neighbor);
      nList.push(neighbor);
      neighbor.queue = true;
    }
  }
  neighborList.push(nList);
}