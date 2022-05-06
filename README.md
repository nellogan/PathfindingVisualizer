#[Interactive pathfinding visualizer live demo](https://nellogan.github.io/PathfindingVisualizer)
Great tool to visualize how search algorithms traverse through a grid with walls and weighted edges.
Dijkstra guarantees the shortest possible path (optimal). A* will also be optimal as the heuristic equation selected will not overestimate the true cost to reach the goal. A* will also use considerably memory than Dijkstra's algorithm. Greedy best first search will always choose the seemingly shortest cost edge.


###Search algorithms to choose from:
Breadth first search
Depth first search
Greedy best first search
Dijkstra's algorithm
A* search algorithm


###How edge cost is calculated:
g(n) = cost of the path from the start node to n.
h(n) = heuristic function (euclidean distance) that estimates the cost of the cheapest path from n to the finish node.
Dijkstra's: f(n) = g(n)
A*: f(n) = g(n) + h(n)
Greedy best first search: f(n) = h(n)


###How to interact:
Click and drag on empty (white) nodes to make them walls.

Shift click and drag to make weighted (orange) nodes. Weighted nodess cost double compared to normal nodes

Click and drag start (green) node or finsih (red) node to move it.

Light green nodes are nodes that are in the neighbor queue while gray nodes are nodes that are already visited.

Features the ability to recursively generate a maze.

###Tech stack: 
Javascript, CSS, and React.