export function dijkstra(grid, startNode, finishNode){
  const openList = [startNode];
  const closedList = [];
  const neighborList = [];
  startNode.gscore = 0;
  let node = null;
  while (!!openList.length){
    sortNodesByGScore(openList);
    node = openList.shift();
    if (node.isWall) {continue};
    node.isVisited = true;
    closedList.push(node);
    if (node.isFinish) { closedList[closedList.length-1]=[finishNode]; return [closedList,neighborList] };
    updateNeighbors(grid, node, finishNode, openList, neighborList);
  };
  return [closedList, neighborList];
};

//gscore is the same as "distance".
//could use tempGScore+=.414 instead.
function updateNeighbors(grid, node, finishNode, openList, neighborList) {
  const neighbors = getNeighbors(grid, node, openList);
  const nList = [];
  for (let neighbor of neighbors) {
    let tempGScore = node.gscore + 1 + neighbor.weight;
    if ((Math.abs(neighbor.row-node.row) + Math.abs(neighbor.col-node.col)) > 1) {
      tempGScore = node.gscore + 1.414 + neighbor.weight;
    };
    if (tempGScore < neighbor.gscore) {
      neighbor.gscore = tempGScore;
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

function getNeighbors(grid, node, closedList) {
  let neighbors = [];
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

function sortNodesByGScore(openList) {
  openList.sort((nodeA, nodeB) => (nodeA.gscore - nodeB.gscore));
};