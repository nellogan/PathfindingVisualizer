import React from "react";
import "./Graph.css"

function DrawNode({ row, col, graphRefs, handleMouseDown, handleMouseUp }) {
    return (
        <div ref={graphRefs[row][col]}
             id={`node-${row}-${col}`}
             className={"node"}
             onMouseDown={(e) => handleMouseDown(e, row, col)}
             onMouseUp={(e) => handleMouseUp(e, row, col)}
        />
    );
}

function DrawRow({ rowIdx, numCols, graphRefs, handleMouseDown, handleMouseUp }) {
    const rowData = [];
    for ( let j=0; j<numCols; j++ ) {
        rowData.push(
            <DrawNode key={`node-${j}`}
                      row={rowIdx}
                      col={j}
                      graphRefs={graphRefs}
                      handleMouseDown={handleMouseDown}
                      handleMouseUp={handleMouseUp}
            />
        );
    }

    return (
        <div className="graph-node-row" id={`row-${rowIdx}`} key={`row-${rowIdx}`} >
            {rowData}
        </div>
    );
}

function DrawGraph({ numRows, numCols, graphRefs, handleMouseDown, handleMouseUp }) {
    const graphData = [];
    for ( let i=0; i<numRows; i++ ) {
        graphData.push(
            <DrawRow key={`row-${i}`}
                     rowIdx={i}
                     numCols={numCols}
                     graphRefs={graphRefs}
                     handleMouseDown={handleMouseDown}
                     handleMouseUp={handleMouseUp}
            />
        );
    }
    return (<>{graphData}</>);
}

export default function Graph(props) {
    return (
        <div className="graph-container">
            <DrawGraph {...props} />
        </div>
    );
}
