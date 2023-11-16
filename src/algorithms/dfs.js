import {getNeighbors} from './util/getNeighbors.js'

export function dfs(grid,startNode, finishNode)
{
  const closedList=[];
  const neighborList = [];
  dfsHelper(grid, startNode, finishNode, closedList, neighborList);
  return [closedList, neighborList];
}

function dfsHelper(grid, node, finishNode, closedList, neighborList)
{
  closedList.push(node);
  node.isVisited = true;
  if (node.isFinish) { return true }
  const neighbors = getNeighbors(grid, node);
  if (neighbors.length)
  {
    for (let i = 0; i < neighbors.length; i++)
    {
      neighborList.push([neighbors[i]]);
      neighbors[i].queue = true;
      neighbors[i].previousNode = node;
      if (dfsHelper(grid, neighbors[i], finishNode, closedList, neighborList)) { return true; }
    }
  }
  return false;
}