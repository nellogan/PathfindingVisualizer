export default function resetNodeData(node) {
    node.visited = false,
    node.wall = false,
    node.queue = null,
    node.weight = 1,
    node.previousNode = null,
    node.fscore = Infinity,
    node.gscore = Infinity
}