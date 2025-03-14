export default function initializeNodeData(row, col) {
    return {
        row: row,
        col: col,
        start: false,
        finish: false,
        visited: false,
        wall: false,
        queue: null,
        weight: 1,
        previousNode: null,
        fscore: Infinity,
        gscore: Infinity
    };
}