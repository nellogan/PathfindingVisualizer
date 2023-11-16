import {getNeighborsOctal} from './getNeighborsOctal.js'
import {euclideanDistance} from './euclideanDistance.js'

export function updateNeighborsGreedy(grid, node, finishNode, openList, neighborList)
{
  const neighbors = getNeighborsOctal(grid, node);
  const nList = [];
  for (let neighbor of neighbors)
  {
    let tempFScore = euclideanDistance(neighbor, finishNode) + 1 + neighbor.weight;
    if ((Math.abs(neighbor.row - node.row) + Math.abs(neighbor.col - node.col)) > 1)
    {
      tempFScore = euclideanDistance(neighbor, finishNode) + 1.414 + neighbor.weight;
    }
    if (tempFScore < neighbor.fscore)
    {
      neighbor.fscore = tempFScore;
      neighbor.previousNode = node;
      if (!openList.includes(neighbor)) {
        openList.push(neighbor);
        nList.push(neighbor);
        neighbor.queue = true;
      }
    }
  }
  neighborList.push(nList);
}