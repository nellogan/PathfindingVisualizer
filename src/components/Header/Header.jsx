import React from "react";
import "./Header.css"

export default function Header(props) {
    return (
        <div className="header-container">
            <p className="header-title">Pathfinding🔎Visualizer</p>
            <a className="header-link" href="https://github.com/nellogan/PathfindingVisualizer">Source</a>
        </div>
    );
}
