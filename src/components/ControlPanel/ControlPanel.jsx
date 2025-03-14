import React, { useState, useCallback } from "react";
import Dropdown from "../Dropdown/Dropdown.jsx";
import mazeGenerator from "../../algorithms/mazeGenerator.js";
import resetNodeData from "../../utils/resetNodeData.js";
import cancelPendingAnimations from "../../utils/cancelPendingAnimations.js";
import "./ControlPanel.css";
import "../Graph/Graph.css";

function ControlPanelNav(props) {
    const {
        numRows,
        numCols,
        graph,
        algoChoices,
        runAlgorithmCallback,
        pendingAnimationIds,
        setPendingAnimationIds,
        setReport
    } = props;
    const [algorithm, setAlgorithm] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const algorithmSelect = useCallback((algo) => {
        setAlgorithm(algo);
        if (disabled) { setDisabled(false); }
    }, []);

    const handleRunAlgo = () => {
       runAlgorithmCallback(algorithm);
    };

    const handleMazeGenerator = () => {
        let walls = mazeGenerator(graph.data, graph.startNode, graph.finishNode);
        for ( let wall of walls ) {
            let row = wall[0];
            let col = wall[1];
            let node = graph.nodes[row][col];
            node.data.wall = true;
            node.ref.current.classList.add("node-wall");
        }
    }

    const handleResetGraph = () => {
        for ( let i=0; i<numRows; i++ ) {
            for ( let j=0; j<numCols; j++ ) {
                let element = graph.data[i][j];
                if ( element.wall ) { continue; }
                let nodeIsStart = false;
                if ( element.start ) { nodeIsStart = true; }
                let nodeIsFinish = false;
                if ( element.finish ) { nodeIsFinish = true; }
                let weightedNode = false;
                if ( element.weight > 1 ) { weightedNode = true; }

                resetNodeData(element);
                let elementRef = graph.refs[i][j].current;
                elementRef.className = "node"
                if ( nodeIsStart ) { element.start = true; elementRef.classList.add("node-start"); }
                if ( nodeIsFinish ) { element.finish = true; elementRef.classList.add("node-finish"); }
                if ( weightedNode ) { element.weight = 2; elementRef.classList.add("node-weight"); }
            }
        }
        setReport({
            time: 0,
            pathCost: 0,
            numVisited: 0,
            numQueue: 0
        });
        if ( pendingAnimationIds.visitedOrInQueue ) {
            cancelPendingAnimations(pendingAnimationIds);
            setPendingAnimationIds({
                visitedOrInQueue: null,
                initialShortestPath: null,
                shortestPathElements: null
            });
        }
    }

    const handleClearWeights = () => {
        for ( let i=0; i<numRows; i++ ) {
            for ( let j=0; j<numCols; j++ ) {
                let element = graph.data[i][j];
                if ( !element.weight ) { continue; }
                resetNodeData(element);
                let elementRef = graph.refs[i][j].current;
                elementRef.classList.remove("node-weight");
            }
        }
    };

    const handleClearWalls = () => {
        for ( let i=0; i<numRows; i++ ) {
            for ( let j=0; j<numCols; j++ ) {
                let element = graph.data[i][j];
                if ( !element.wall ) { continue; }
                resetNodeData(element);
                let elementRef = graph.refs[i][j].current;
                elementRef.className = "node";
            }
        }
    };

    const handleClearGraph = () => {
        for ( let i=0; i<numRows; i++ ) {
            for ( let j=0; j<numCols; j++ ) {
                let element = graph.data[i][j];
                resetNodeData(element);
                if ( element.start || element.finish ) { continue; }
                let elementRef = graph.refs[i][j].current;
                elementRef.className = "node";
            }
        }
        setReport({
            time: 0,
            pathCost: 0,
            numVisited: 0,
            numQueue: 0
        });
        if ( pendingAnimationIds.visitedOrInQueue ) {
            cancelPendingAnimations(pendingAnimationIds);
            setPendingAnimationIds({
                visitedOrInQueue: null,
                initialShortestPath: null,
                shortestPathElements: null
            });
        }
    }

    const selectAlgorithmProps = {
        title: "Select Algorithm",
        liClassNameArg: "control-panel-il",
        buttonClassNameArg: "control-panel-button",
        options: algoChoices,
        callbackFn: algorithmSelect
    };

    const cleanUpFnsDictionary = {
        "Reset Graph": handleResetGraph,
        "Clear Weights": handleClearWeights,
        "Clear Walls": handleClearWalls,
        "Clear Graph": handleClearGraph
    };
    const runCleanUpFn = (FnName) => {
        cleanUpFnsDictionary[FnName]();
    };
    const cleanUpProps = {
        title: "Clean Up",
        liClassNameArg: "control-panel-il",
        buttonClassNameArg: "control-panel-button",
        options: Object.keys(cleanUpFnsDictionary),
        callbackFn: runCleanUpFn
    };

    return(
        <nav className="control-panel-nav">
            <ul className="control-panel-ul">

                <Dropdown {...selectAlgorithmProps} />

                <li className="control-panel-il">
                    <button className="control-panel-button" disabled={disabled} onClick={handleRunAlgo}>
                        { disabled == true ? "Run Algorithm" : `Run ${algorithm}` }
                    </button>
                </li>

                <li className="control-panel-il">
                    <button className="control-panel-button" onClick={handleMazeGenerator}>
                        Generate Maze
                    </button>
                </li>

                <Dropdown {...cleanUpProps} />

            </ul>
        </nav>
    );
}

export default function ControlPanel(props) {
    return (
        <div className="control-panel-container">
            <ControlPanelNav {...props} />
        </div>
    );
}
