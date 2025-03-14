# [Live Demo](https://nellogan.github.io/PathfindingVisualizer)
Click on the link above for a live demo. Visualize how search algorithms traverse through a graph with walls and weighted 
edges. Dijkstra's algorithm guarantees the shortest possible path (optimal cost path). The A* algorithm will also determine the 
shortest path while incorporating a heuristic function (more efficient). The heuristic estimates the cost of the cheapest 
path from the current node (denoted as 'n') to the goal, thereby reducing the amount of neighbors visited and finding the 
shortest path in less time than Dijkstra's. Greedy best first search only use the heuristic function which will always 
choose the current shortest cost edge.


### Search algorithms to choose from
    Depth first search
    Breadth first search
    Greedy best first search
    Dijkstra's algorithm
    A* search algorithm

### How to interact
Click and drag start node (green) or finish node (red) to move its position.

Shift click to create or remove a wall node (black).

Shift click to add/remove weight (double cost) to/from a node (pink).

Option to recursively generate a maze. Sometimes the generator will produce a non-solvable maze.

Clean up options:

    Reset Graph: resets all path (yellow), visited (gray), and neighbor nodes(light green).
    Clear Weights: clears all weight nodes.
    Clear Walls: clears all wall nodes.
    Clear Graph: clear all node types except for the start and end nodes.

### How edge cost is calculated
g(n) = cost of the path from the start node to n.

h(n) = heuristic function that estimates the cost of the cheapest path from n to the finish node.

Dijkstra's: f(n) = g(n)

A*: f(n) = g(n) + h(n)

Greedy best first search: f(n) = h(n)

### Tools used: 
    React
    CSS
    Webpack
    ESBuild

### How to run locally
    git clone https://github.com/nellogan/PathfindingVisualizer
    npm install
    npm run start-dev