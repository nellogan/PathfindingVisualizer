# [Interactive pathfinding visualizer live demo](https://nellogan.github.io/PathfindingVisualizer)
Click on the link above for a live demo. Visualize how search algorithms traverse through a grid with walls and weighted 
edges. Dijkstra's algorithm guarantees the shortest possible path (optimal). A* algorithm will also determine the 
shortest path while incorporating a heuristic function. The heuristic estimates the cost of the cheapest path from n to 
the goal, thereby reducing the amount of neighbors visited and finding the shortest path in less time than Dijkstra's. 
Greedy best first search only use the heuristic function which will always choose the current shortest cost edge.


### Search algorithms to choose from:
Breadth first search

Depth first search

Greedy best first search

Dijkstra's algorithm

A* search algorithm


### How edge cost is calculated:
g(n) = cost of the path from the start node to n.

h(n) = heuristic function that estimates the cost of the cheapest path from n to the finish node.

Dijkstra's: f(n) = g(n)

A*: f(n) = g(n) + h(n)

Greedy best first search: f(n) = h(n)


### How to interact:
Click and drag on empty (white) nodes to make them walls (black).

Press shift+click and drag to make weighted (orange) nodes. Weighted nodes cost double compared to normal nodes

Click and drag start (dark green) node or finish (red) node to move it.

Light green nodes are nodes that are in the neighbor queue while gray nodes are nodes that are already visited.

Option to recursively generate a maze.

### Tech stack: 
Javascript, CSS, and React.
