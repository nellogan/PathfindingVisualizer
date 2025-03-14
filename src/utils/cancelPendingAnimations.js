export default function cancelPendingAnimations(pendingAnimationIds) {
    for ( let animationId of pendingAnimationIds.visitedOrInQueue ) {
        clearTimeout(animationId);
    }

    clearTimeout(pendingAnimationIds.initialShortestPath);
    if ( pendingAnimationIds.shortestPathElements ) {
        for ( let animationId of pendingAnimationIds.shortestPathElements ) {
            clearTimeout(animationId);
        }
    }
}