// Greedy best first search f(n)= h(n) = chebyshevDistance(node,finishNode) + node.weight
export function gbfs(grid, startNode, finishNode){
  const openList = [startNode];
  const closedList = [];
  const neighborList = [];
  startNode.fscore = euclideanDistance(startNode, finishNode);
  let node = null;
  while (!!openList.length){
    sortNodesByFScore(openList);
    node = openList.shift();
    if (node.isWall) { continue };
    node.isVisited = true;
    closedList.push(node);
    if (node.isFinish) { closedList[closedList.length-1]=[finishNode]; return [closedList, neighborList] };
    updateNeighbors(grid, node, finishNode, openList, neighborList);
  };
  return [closedList, neighborList];
};

function updateNeighbors(grid, node, finishNode, openList, neighborList) {
  const neighbors = getNeighbors(grid, node);
  const nList = [];
  for (let neighbor of neighbors) {
    let tempFScore = euclideanDistance(neighbor, finishNode) + 1 + neighbor.weight;
    if ((Math.abs(neighbor.row - node.row) + Math.abs(neighbor.col - node.col)) > 1) {
      tempFScore = euclideanDistance(neighbor, finishNode) + 1.414 + neighbor.weight;
    };
    if (tempFScore < neighbor.fscore) {
      neighbor.fscore = tempFScore;
      neighbor.previousNode = node;
      if (!openList.includes(neighbor)) {
        openList.push(neighbor);
        nList.push(neighbor);
        neighbor.queue = true;
      };
    };
  };
  neighborList.push(nList);
};

function getNeighbors(grid, node) {
  const neighbors = [];
  const { row,col } = node;
  if (row > 0) { neighbors.push(grid[row-1][col]) };
  if (row < grid.length - 1) { neighbors.push(grid[row+1][col]) };
  if (col > 0) { neighbors.push(grid[row][col-1]) };
  if (col < grid[0].length - 1) { neighbors.push(grid[row][col+1]) };
  if (row > 0 && col > 0) { neighbors.push(grid[row-1][col-1]) };
  if (row > 0 && col < grid[0].length -1) { neighbors.push(grid[row-1][col+1]) };
  if (row < grid.length - 1 && col > 0) { neighbors.push(grid[row+1][col-1]) };
  if (row < grid.length - 1 && col < grid[0].length - 1) { neighbors.push(grid[row+1][col+1]) };
  return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall));
};

function sortNodesByFScore(openList) {
  openList.sort((nodeA, nodeB) => (nodeA.fscore - nodeB.fscore));
};

function euclideanDistance(n1, n2){
  const dy = n2.row - n1.row
  const dx = n2.col - n1.col
  return Math.sqrt((dx*dx) + (dy*dy));
};