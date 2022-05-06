import React from "react";
import "./Node.css";

export default function Node2(props) {
    const extraClassName = props.isFinish
      ? "node-finish"
      : props.isStart
      ? "node-start"
      : props.weight
      ? "node-weight"
      : props.isVisited
      ? "node-visited"
      : props.isWall
      ? "node-wall"
      : props.queue
      ? "node-queue"
      : "";

    return (
      <div
        id={`node-${props.row}-${props.col}`}
        className={`node ${extraClassName}`}
        onMouseDown={(e) => props.onMouseDown(props.row, props.col, e)}
        onMouseEnter={(e) => props.onMouseEnter(props.row, props.col, e)}
        onMouseUp={(e) => props.onMouseUp(props.row, props.col, e)}
      >
      </div>
    );
};