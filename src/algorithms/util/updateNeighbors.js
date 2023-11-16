import {getNeighborsOctal} from './getNeighborsOctal.js'
import {sortNodesByFScore} from './sortNodesByFScore.js'
import {euclideanDistance} from './euclideanDistance.js'

export function updateNeighbors(grid, node, finishNode, openList, neighborList)
{
  const neighbors = getNeighborsOctal(grid, node);
  const nList = [];
  sortNodesByFScore(neighbors);
  for (let neighbor of neighbors)
  {
    let tempGScore = node.gscore + 1 + neighbor.weight;
    if ((Math.abs(neighbor.row-node.row) + Math.abs(neighbor.col-node.col))>1)
    {
      tempGScore = node.gscore + 1.414 + neighbor.weight;
    }
    if (tempGScore < neighbor.gscore)
    {
      neighbor.gscore = tempGScore;
      neighbor.fscore = tempGScore + euclideanDistance(neighbor, finishNode);
      neighbor.previousNode = node;
      if (!openList.includes(neighbor))
      {
        openList.push(neighbor);
        nList.push(neighbor);
        neighbor.queue = true;
      }
    }
  }
  neighborList.push(nList);
}