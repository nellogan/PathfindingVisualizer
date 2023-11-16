export function getNeighborsOctal(grid, node)
{
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) { neighbors.push(grid[row-1][col]) };
  if (row < grid.length - 1) { neighbors.push(grid[row+1][col]) };
  if (col > 0) { neighbors.push(grid[row][col-1]) };
  if (col < grid[0].length - 1) { neighbors.push(grid[row][col+1]) };
  if (row > 0 && col > 0) { neighbors.push(grid[row-1][col-1]) };
  if (row > 0 && col < grid[0].length -1) { neighbors.push(grid[row-1][col+1]) };
  if (row < grid.length - 1 && col > 0) { neighbors.push(grid[row+1][col-1]) };
  if (row < grid.length - 1 && col < grid[0].length - 1) { neighbors.push(grid[row+1][col+1]) };
  return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall));
}