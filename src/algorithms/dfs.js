export function dfs(grid,startNode, finishNode) {
  const closedList=[];
  const neighborList = [];
  dfsHelper(grid, startNode, finishNode, closedList, neighborList);
  return [closedList, neighborList];
};

function dfsHelper(grid, node, finishNode, closedList, neighborList) {
  closedList.push(node);
  if (node.isFinish){ return true };
  node.isVisited = true;
  const neighbors = getNeighbors(grid, node);
  if (neighbors.length) {
    for (let i = 0; i < neighbors.length; i++) {
      neighborList.push([neighbors[i]]);
      neighbors[i].queue = true;
      neighbors[i].previousNode = node;
      if (dfsHelper(grid, neighbors[i], finishNode, closedList, neighborList)) { return true };
      return dfsHelper(grid, neighbors[i].previousNode, finishNode, closedList, neighborList);
    };
  };
  return false
};

function getNeighbors(grid, node) {
  const {col,row} = node;
  node.isVisited = true;
  const neighbors = [];
  if (row > 0 && !grid[row-1][col].isVisited && !grid[row-1][col].isWall) {
    neighbors.push(grid[row-1][col]);
  } else if (col < grid[0].length - 1 && !grid[row][col+1].isVisited && !grid[row][col+1].isWall) {
    neighbors.push(grid[row][col+1]);
  } else if (row < grid.length - 1 && !grid[row+1][col].isVisited && !grid[row+1][col].isWall) {
    neighbors.push(grid[row+1][col]);
  } else if (col > 0 && !grid[row][col-1].isVisited && !grid[row][col-1].isWall) {
    neighbors.push(grid[row][col-1]);
  };
  return neighbors
};