import { useRef } from "react";
import initializeNodeData from "./initializeNodeData";

/* Keep contiguous arrays of both node data and refs to faster parsing and cleaner logic for utility functions. */
export default function generateGraph(numRows, numCols) {
    const data = [];
    const refs = [];
    const nodes = [];
    for ( let i=0; i<numRows; i++ ) {
        let dataRow = [];
        let refsRow = [];
        let nodesRow = [];
        for ( let j=0; j<numCols; j++ ) {
            let dataPoint = initializeNodeData(i,j);
            dataRow.push(dataPoint);
            let ref = useRef();
            refsRow.push(ref);
            let node = {
                data: dataPoint,
                ref:  ref
            };
            nodesRow.push(node);
        }
        data.push(dataRow);
        refs.push(refsRow);
        nodes.push(nodesRow);
    }

    let startNode = nodes[0][0];
    startNode.data.start = true;
    let finishNode = nodes[numRows-1][numCols-1];
    finishNode.data.finish = true;
    /* At this point refs are not set yet, apply classNames after initial render with useEffect and an empty
    dependency array. */
    return {"data": data, "refs": refs, "nodes": nodes, "startNode": startNode, "finishNode": finishNode};
}