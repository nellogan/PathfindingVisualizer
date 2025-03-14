export default function getNeighbors(grid, node) {
    const neighbors = [];
    const { row,col } = node;
    const max_row = grid.length-1;
    const max_col = grid[0].length-1;

    /* up */
    if (row > 0) { neighbors.push(grid[row-1][col]); };
    /* down */
    if (row < max_row) { neighbors.push(grid[row+1][col]); };
    /* left */
    if (col > 0) { neighbors.push(grid[row][col-1]); };
    /* right */
    if (col < max_col) { neighbors.push(grid[row][col+1]); };
    /* up,left */
    if (row > 0 && col > 0) { neighbors.push(grid[row-1][col-1]); };
    /*  up,right */
    if (row > 0 && col < max_col) { neighbors.push(grid[row-1][col+1]); };
    /* down,left */
    if (row < max_row && col > 0) { neighbors.push(grid[row+1][col-1]); };
    /* down,right */
    if (row < max_row && col < max_col) { neighbors.push(grid[row+1][col+1]); };

    return neighbors.filter(neighbor => (!neighbor.visited && !neighbor.wall && !neighbor.queue));
}
