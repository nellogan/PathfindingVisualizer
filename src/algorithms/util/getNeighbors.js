export function getNeighbors(grid, node) {
  const neighbors = [];
  const { row,col } = node;
  //up
  if (row > 0  && !grid[row-1][col].isVisited && !grid[row-1][col].isWall)
  {
    neighbors.push(grid[row-1][col])
  }
  //right
  if (col < grid[0].length - 1 && !grid[row][col+1].isVisited && !grid[row][col+1].isWall)
  {
    neighbors.push(grid[row][col+1])
  }
  //down
  if (row < grid.length - 1 && !grid[row+1][col].isVisited && !grid[row+1][col].isWall)
  {
    neighbors.push(grid[row+1][col])
  }
  //left
  if (col > 0 && !grid[row][col-1].isVisited && !grid[row][col-1].isWall)
  {
    neighbors.push(grid[row][col-1])
  }
  return neighbors;
};