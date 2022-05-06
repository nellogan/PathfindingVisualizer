export function bfs(grid,startNode, finishNode) {
  const openList = [startNode];
  const closedList=[];
  const neighborList = [];
  let node = null;
  while (!!openList.length) {
    node=openList.shift();
    if (node.isWall){ continue };
    node.isVisited = true;
    closedList.push(node);
    if (node.isFinish) { return [closedList, neighborList] };
    updateNeighbors(grid, node, finishNode, openList, neighborList);
  };
  return [closedList, neighborList];
};

function updateNeighbors(grid, node, finishNode, openList, neighborList) {
  const neighbors = getNeighbors(grid, node);
  const nList = [];
  for (let neighbor of neighbors) {
    neighbor.previousNode = node;
    if (!openList.includes(neighbor)) {
      openList.push(neighbor);
      nList.push(neighbor);
      neighbor.queue = true;
    };
  };
  neighborList.push(nList);
};

function getNeighbors(grid, node) {
  const neighbors = [];
  const { row,col } = node;
  if (row > 0  && !grid[row-1][col].isVisited && !grid[row-1][col].isWall) {
    neighbors.push(grid[row-1][col])
  };
  if (row < grid.length - 1 && !grid[row+1][col].isVisited && !grid[row+1][col].isWall) {
    neighbors.push(grid[row+1][col])
  };
  if (col > 0 && !grid[row][col-1].isVisited && !grid[row][col-1].isWall) {
    neighbors.push(grid[row][col-1])
  };
  if (col < grid[0].length - 1 && !grid[row][col+1].isVisited && !grid[row][col+1].isWall) {
    neighbors.push(grid[row][col+1])
  };
  return neighbors
};