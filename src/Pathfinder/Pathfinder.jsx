import React, { useState } from "react";
import Node from "../Node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/aStar";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { gbfs } from "../algorithms/gbfs";
import { recursiveDivisionMaze } from "../algorithms/recursiveMazeGenerator.js";
import "./Pathfinder.css";
import Navigator from "../Navigation/Navigator";

let START_NODE_ROW = 12;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 12;
let FINISH_NODE_COL = 31;

export default function PathFinder() {
  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 47; col++) {
        currentRow.push(createNode(col, row));
      };
      grid.push(currentRow);
    };
    return grid
    };
  const [state, setState] = useState({
    grid: getInitialGrid(),
    mouseIsPressed: false,
    shiftIsPressed: false,
    movingEndPoint: false,
    });
  const [dropDownOpen, setDropDownOpen] = useState(false);

  function clearPath() {
    const newGrid = state.grid.slice();
    for (let i = 0; i < newGrid.length; i++){
      for (let j = 0; j < newGrid[0].length; j++){
        newGrid[i][j].previousNode = null;
        newGrid[i][j].gscore = Infinity;
        newGrid[i][j].fscore = Infinity;
        newGrid[i][j].shortest = false;
        if (newGrid[i][j].isVisited || newGrid[i][j].queue) {
          newGrid[i][j].isVisited = false;
          newGrid[i][j].queue = false;
          document.getElementById(`node-${i}-${j}`).className =
            "node";
        };
        if (newGrid[i][j].weight > 0) {
          document.getElementById(`node-${i}-${j}`).className =
            "node node-weight";
        };
      };
    };
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className =
      "node node-start";
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className =
      "node node-finish";
    return setState({ grid: newGrid })
    };

  function generateMaze() {
    const newGrid = state.grid.slice();
    const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const walls = recursiveDivisionMaze(newGrid, startNode, finishNode);
    for (let i = 0; i < walls.length; i++) {
      setTimeout(() => {
        const row = walls[i][0];
        const col = walls[i][1];
        newGrid[row][col].isWall = true;
        document.getElementById(`node-${row}-${col}`).className =
          "node node-wall";
      }, 5 * i);
    };
    return setState({ grid: newGrid });
  };

  function clearWallsAndWeights() {
    const newGrid = state.grid.slice();
    for (let i=0; i < newGrid.length; i++){
      for (let j=0; j < newGrid[0].length; j++){
        if (newGrid[i][j].isWall ||  newGrid[i][j].weight > 0) {
          newGrid[i][j].isWall = false;
          newGrid[i][j].weight = 0;
          document.getElementById(`node-${i}-${j}`).className =
            "node";
        };
      };
    };
    return setState({ grid: newGrid });
  };

  function clearGrid() {
    const newGrid = state.grid.slice();
    for (let i = 0; i < newGrid.length; i++){
      for (let j = 0; j < newGrid[0].length; j++){
        newGrid[i][j].isVisited = false;
        newGrid[i][j].isWall = false;
        newGrid[i][j].previousNode = null;
        newGrid[i][j].fscore = Infinity;
        newGrid[i][j].gscore = Infinity;
        newGrid[i][j].weight = 0;
        newGrid[i][j].queue = false;
        document.getElementById(`node-${i}-${j}`).className =
          "node";
      };
    };
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className =
      "node node-start";
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className =
      "node node-finish";

    return setState({ grid: newGrid })
  };

  function handleMouseDown(row, col, e) {
    if (e && state.grid[row][col].isStart) {
      const newStartGrid = state.grid.slice();
      START_NODE_ROW = null;
      START_NODE_COL = null;
      newStartGrid[row][col].isStart = false;
      setState({ ...state,
        grid: newStartGrid,
        movingEndPoint: true
      });
    } else if (e && state.grid[row][col].isFinish) {
        const newFinishGrid = state.grid.slice();
        FINISH_NODE_ROW = null;
        FINISH_NODE_COL = null;
        newFinishGrid[row][col].isFinish = false;
        setState({ ...state,
          grid: newFinishGrid,
          movingEndPoint: true
        });
    } else if (e.shiftKey && !state.grid[row][col].isStart && !state.grid[row][col].isFinish) {
      const newGrid = getNewGridWithWeightToggled(state.grid, row, col);
      setState({ ...state, grid: newGrid, shiftIsPressed: true });
    } else {
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({ ...state, grid: newGrid, mouseIsPressed: true });
    };
  };

  function handleMouseEnter(row, col, e) {
    if (!state.mouseIsPressed && !state.shiftIsPressed) return;
    if (e.shiftKey) {
      const newGrid = getNewGridWithWeightToggled(state.grid, row, col);
      setState({ ...state, grid: newGrid });
    } else {
    if (!state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(state.grid, row, col);
    setState({ ...state, grid: newGrid });
    };
  };

  function handleMouseUp(row, col, e) {
    if (state.movingEndPoint && START_NODE_ROW == null) {
      START_NODE_ROW = row;
      START_NODE_COL = col;
      const newStartGrid = state.grid.slice();
      newStartGrid[row][col].isStart = true;
      newStartGrid[row][col].isWall = false;
      setState({ ...state,
        grid: newStartGrid,
      });
      document.getElementById(`node-${row}-${col}`).className =
        "node node-start";
    } else if (state.movingEndPoint && FINISH_NODE_ROW == null) {
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      const newFinishGrid = state.grid.slice();
      newFinishGrid[row][col].isFinish = true;
      newFinishGrid[row][col].isWall = false;
      setState({ ...state,
        grid: newFinishGrid,
      });
      document.getElementById(`node-${row}-${col}`).className =
        "node node-finish";
    };
    setState({ ...state, movingEndPoint: false, mouseIsPressed: false, shiftIsPressed: false });
  };

  function animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodes.length; i++) {
      if (i === visitedNodes.length-1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      };
      if (visitedNodes[i].isStart) {continue}
      function paintVisitedOrInQueue() {
        const node = visitedNodes[i];
        const nodeNeighbor = neighborsQueue[i];
        for (let k = 0; k < neighborsQueue.length - 1; k++){
          if (nodeNeighbor && nodeNeighbor[k]){
            document.getElementById(`node-${nodeNeighbor[k].row}-${nodeNeighbor[k].col}`).className =
              "node node-queue";
          };
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
        };
      };
      setTimeout(paintVisitedOrInQueue, 10 * i);
    };
    return setState({ ...state, grid:grid })
  };

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    };
  };

  function runDijkstra() {
    const { grid } = state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodes,neighborsQueue] = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathDijkstra = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPathDijkstra);
  };

  function runAStar() {
    const { grid } = state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodes,neighborsQueue] = aStar(grid, startNode, finishNode);
    const nodesInShortestPathAStar = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPathAStar);
  };

  function runGBFS() {
    const { grid } = state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodes,neighborsQueue] = gbfs(grid, startNode, finishNode);
    const nodesInShortestPathGBFS = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPathGBFS);
  };

  function runDFS() {
    const { grid } = state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodes,neighborsQueue] = dfs(grid, startNode, finishNode);
    const nodesInShortestPathDFS = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPathDFS);
  };

  function runBFS() {
    let { grid } = state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const [visitedNodes,neighborsQueue] = bfs(grid, startNode, finishNode);
    const nodesInShortestPathBFS = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodes, neighborsQueue,nodesInShortestPathBFS);
  };
  
    const { grid, mouseIsPressed } = state;
    
    return (
      <>
        <Navigator
          state = { state }
          generateMaze = { generateMaze }
          clearPath = { clearPath }
          clearWallsAndWeights = { clearWallsAndWeights }
          clearGrid = { clearGrid }
          runDFS = { runDFS }
          runBFS = { runBFS }
          runGBFS = { runGBFS }
          runDijkstra = { runDijkstra }
          runAStar = { runAStar }
          animateAlgorithm = { animateAlgorithm }
          animateShortestPath = { animateShortestPath }
          open = { dropDownOpen }
          setOpen = { setDropDownOpen }
        />
        <div className = "grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key = { rowIdx }>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isVisited, isWall, weight, queue, fscore, gscore } = node;
                  return (
                    <Node
                      key = { nodeIdx }
                      col = { col }
                      row = { row }
                      isFinish = { isFinish }
                      isStart = { isStart }
                      isVisited = { isVisited }
                      isWall = { isWall }
                      weight = { weight }
                      queue = { queue }
                      fscore = { fscore }
                      gscore = { gscore }
                      mouseIsPressed = { mouseIsPressed }
                      onMouseDown = { (row, col, e) => handleMouseDown(row, col, e) }
                      onMouseEnter = { (row, col, e) =>
                        handleMouseEnter(row, col, e)
                      }
                      onMouseUp={ (row,col,e) => handleMouseUp(row, col, e) }
                    >
                    </Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    )
};

const createNode = (col, row) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    isWall: false,
    queue: false,
    weight: 0,
    previousNode: null,
    fscore:Infinity,
    gscore:Infinity,
  }
};

const getNewGridWithWallToggled = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isFinish || grid[row][col].weight) { return grid }
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid
};

const getNewGridWithWeightToggled = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isFinish || grid[row][col].isWall) { return grid }
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    weight: node.weight ? 0 : 1
  };
  newGrid[row][col] = newNode;
  return newGrid
};

function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  };
  return nodesInShortestPathOrder
};