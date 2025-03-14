import React from "react";
import "./Results.css"
import "../Graph/Graph.css"

export default function Results({ report }) {
    const { time, pathCost, numVisited, numQueue } = report;

    return (
        <div className="results-container">
            <div className="results-header">Results</div>
            <div className="results-items-container">

                <div className="results-item">
                    Computation Time: { time } seconds
                </div>
                <div className="results-item">
                    <div className="node node-shortest-path-color" style={{ marginRight: "4px" }} />Path Cost: { pathCost }
                </div>
                <div className="results-item">
                    <div className="node node-visited-color" style={{ marginRight: "4px" }} />Visited: { numVisited }
                </div>
                <div className="results-item">
                    <div className="node node-queue" style={{ marginRight: "4px" }} />Queue: { numQueue }
                </div>

            </div>
        </div>
    );
}