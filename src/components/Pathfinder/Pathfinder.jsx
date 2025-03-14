import React, { useState, useCallback, useEffect, useRef } from "react";
import ControlPanel from "../ControlPanel/ControlPanel.jsx";
import Results from "../Results/Results.jsx";
import Graph from "../Graph/Graph.jsx";

import generateGraph from "../../utils/generateGraph.js";
import animateAlgorithm from "../../utils/animateAlgorithm.js";
import getNodesInShortestPathOrder from "../../utils/getNodesInShortestPathOrder.js";
import resetNodePathData from "../../utils/resetNodePathData.js";

import depthFirstSearch from "../../algorithms/depthFirstSearch.js";
import breadthFirstSearch from "../../algorithms/breadthFirstSearch.js";
import greedyBestFirstSearch from "../../algorithms/greedyBestFirstSearch.js";
import dijkstra from "../../algorithms/dijkstra.js";
import aStar from "../../algorithms/aStar.js";

export default function Pathfinder(props) {
    const { numRows, numCols } = props;
    const [state, setState] = useState({
        numRows: numRows,
        numCols: numCols,
        graph: generateGraph(numRows, numCols),
        movingStart: false,
        movingFinish: false,
        mouseIsPressed: false,
        shiftIsPressed: false,
    });
    const [report, setReport] = useState({
        time: 0,
        pathCost: 0,
        numVisited: 0,
        numQueue: 0
    });
    const [pendingAnimationIds, setPendingAnimationIds] = useState({
        visitedOrInQueue: null,
        initialShortestPath: null,
        shortestPathElements: null
    });

    useEffect(() => {
        state.graph.startNode.ref.current.className = "node node-start";
        state.graph.finishNode.ref.current.className = "node node-finish";
    }, [state.graph]);

    const algoDictionary = {
        "Depth First Search": depthFirstSearch,
        "Breadth First Search": breadthFirstSearch,
        "Greedy Best First Search": greedyBestFirstSearch,
        "Dijkstra": dijkstra,
        "A*": aStar
    };

    const handleMouseDown = useCallback((e, row, col) => {
        let node = state.graph.nodes[row][col];
        if ( e && node.data.start ) {
            setState({
                ...state,
                movingStart: true,
            });
        } else if ( e && node.data.finish ) {
            setState({
                ...state,
                movingFinish: true
            });
        } else if ( e.shiftKey && !node.data.start && !node.data.finish ) {
            if ( node.data.wall ) {
                node.data.wall = false;
                node.ref.current.className = "node";
            } else {
                node.data.wall = true;
                node.ref.current.className = "node node-wall";
            }
            setState({
                ...state,
                graph: {
                    ...state.graph,
                }
            });
        } else if ( e.ctrlKey && !node.data.start && !node.data.finish ) {
            if ( node.data.weight > 1 ) {
                node.data.weight = 1;
                node.ref.current.className = "node";
            } else {
                node.data.weight = 2;
                node.ref.current.className = "node node-weight";
            }
            setState({
                ...state,
                graph: {
                    ...state.graph,
                }
            });
        }
    }, [state.movingStart, state.movingFinish]);

    const handleMouseUp = useCallback((e, row, col) => {
        let node = state.graph.nodes[row][col];
        if ( e && state.movingStart && !node.data.finish ) {
            let prevStartNode = state.graph.startNode;
            prevStartNode.data.start = false;
            prevStartNode.ref.current.className = "node";

            node.data.start = true;
            node.ref.current.className = "node node-start";
            setState({
                ...state,
                graph: {
                  ...state.graph,
                  startNode: node
                },
                movingStart: false
            });
        } else if ( e && state.movingFinish && !node.data.start ) {
            let prevFinishNode = state.graph.finishNode;
            prevFinishNode.data.finish = false;
            prevFinishNode.ref.current.className = "node";

            node.data.finish = true;
            node.ref.current.className = "node node-finish";
            setState({
                ...state,
                graph: {
                  ...state.graph,
                  finishNode: node
                },
                movingFinish: false
            });
        }
    }, [state.movingStart, state.movingFinish]);

    const runAlgorithmCallback = useCallback((algo) => {
        let { graph } = state;
        let startNode = graph.startNode;
        let finishNode = graph.finishNode;

        /* Javascript's time resolution is limited to 1e-3 (milliseconds) to mitigate timing attacks and fingerprinting.
        Repeat the algorithm and take an average to handle cases where the algorithm is less than 1 millisecond
        (performance.now() measures in milliseconds). */
        let numRepeat = 100;
        let startTime = performance.now() + performance.timeOrigin;
        for ( let i=0; i<numRepeat-1; i++ ) {
            let [visitedNodes, neighborsQueue] =  algoDictionary[algo](graph.data, startNode.data, finishNode.data);
            for ( let i=0; i<numRows; i++ ) {
                for ( let j=0; j<numCols; j++ ) {
                    let element = graph.data[i][j];
                    resetNodePathData(element);
                    if ( element.start || element.finish || element.wall || element.weight > 1 ) { continue; }
                    let elementRef = graph.refs[i][j].current;
                    elementRef.className = "node";
                }
            }
        }
        let [visitedNodes, neighborsQueue] =  algoDictionary[algo](graph.data, startNode.data, finishNode.data);
        let endTime = performance.now() + performance.timeOrigin;
        let totalTimeSeconds = (endTime - startTime) / ( numRepeat * 1000 );
        const nodesInShortestPath = getNodesInShortestPathOrder(finishNode.data);

        let remainingInQueue = [];
        for ( let subNeighborList of neighborsQueue ) {
            for ( let subNeighbor of subNeighborList ) {
                if ( subNeighbor.queue && !remainingInQueue.includes(subNeighbor) && !subNeighbor.finish ) {
                    remainingInQueue.push(subNeighbor);
                }
            }
        }

        setReport({
            time: totalTimeSeconds,
            pathCost: nodesInShortestPath.length - 1, /* Discount start node. */
            numVisited: visitedNodes.length - 1, /* Discount start node. */
            numQueue: remainingInQueue.length
        });

        setPendingAnimationIds(animateAlgorithm(visitedNodes, neighborsQueue, nodesInShortestPath, graph.refs));
    }, [state.graph.startNode, state.graph.finishNode]);

    return (
        <>
            <ControlPanel numRows={state.numRows}
                          numCols={state.numCols}
                          graph={state.graph}
                          algoChoices={Object.keys(algoDictionary)}
                          runAlgorithmCallback={runAlgorithmCallback}
                          pendingAnimationIds={pendingAnimationIds}
                          setPendingAnimationIds={setPendingAnimationIds}
                          setReport={setReport}
            />
            <Results report={report} />
            <Graph numRows={state.numRows}
                   numCols={state.numCols}
                   graphRefs={state.graph.refs}
                   handleMouseDown={handleMouseDown}
                   handleMouseUp={handleMouseUp}
            />
        </>
    );
}
