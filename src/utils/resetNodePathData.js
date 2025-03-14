/* Helper function to reset nodes that are changed during performance time measurement runs. */
export default function resetNodePathData(node) {
    node.visited = false,
    node.queue = null,
    node.previousNode = null,
    node.fscore = Infinity,
    node.gscore = Infinity
}