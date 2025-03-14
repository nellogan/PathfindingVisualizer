export default function animateShortestPath(nodesInShortestPathOrder, graphRefs) {
    let pendingAnimationIds = [];
    let timeoutId = null;
    for ( let i = 1; i < nodesInShortestPathOrder.length-1; i++ ) {
        timeoutId = setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            graphRefs[node.row][node.col].current.className = "node node-shortest-path";
        }, 50 * i);
        pendingAnimationIds.push(timeoutId);
    }
    return pendingAnimationIds;
}