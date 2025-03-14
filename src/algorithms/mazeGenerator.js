/* Horizontal/Vertical === # of possible horizontal/vertical divisions. */
export default function mazeGenerator(graph, startNode, finishNode) {
    let horizontal = range(graph.length);
    let vertical = range(graph[0].length);
    let walls = [];
    getRecursiveWalls(graph, startNode, finishNode, vertical, horizontal, walls);
    return walls;
}

/* Horizontal division of graph =>  vertical wall => direction === 0.
Vertical division of graph => horizontal wall => direction === 1.
slice(0,vertical.indexOf(num) and vertical.slice(vertical.indexOf(num) + 1) to recurse on both divided sections.
Every odd number is randomly generated to ensure path between walls. */
function getRecursiveWalls(graph, startNode, finishNode, vertical, horizontal, walls) {
    if ( vertical.length < 2 || horizontal.length < 2 ) { return; }
    let direction;
    let num;
    if ( vertical.length > horizontal.length ) {
        direction = 0;
        num = generateRandomOddNumber(vertical);
    }
    if ( vertical.length <= horizontal.length ) {
        direction = 1;
        num = generateRandomOddNumber(horizontal);
    }
    if ( direction === 0 ) {
        addWall(direction, num, vertical, horizontal, startNode, finishNode, walls);
        getRecursiveWalls(
            graph,
            startNode,
            finishNode,
            vertical.slice(0, vertical.indexOf(num)),
            horizontal,
            walls
        );
        getRecursiveWalls(
            graph,
            startNode,
            finishNode,
            vertical.slice(vertical.indexOf(num) + 1),
            horizontal,
            walls
        );
    } else {
        addWall(direction, num, vertical, horizontal, startNode, finishNode, walls);
        getRecursiveWalls(
            graph,
            startNode,
            finishNode,
            vertical,
            horizontal.slice(0, horizontal.indexOf(num)),
            walls
        );
        getRecursiveWalls(
            graph,
            startNode,
            finishNode,
            vertical,
            horizontal.slice(horizontal.indexOf(num) + 1),
            walls
        );
    }
}


/* if (direction === 0) num is the col randomly selected for the wall to be built on.
if (direction === 1) num is the row randomly selected for the wall to be built on.
if start or finish node is not found, delete even random node from walls list to create gap in wall. */
function addWall(direction, num, vertical, horizontal, startNode, finishNode, walls) {
    let isStartFinish = false;
    let tempWalls = [];
    if ( direction === 0 ) {
        if ( horizontal.length === 2 ) { return; }
        for ( let temp of horizontal ) {
            if ( (temp === startNode.data.row && num === startNode.data.col) ||
                 (temp === finishNode.data.row && num === finishNode.data.col) ) {
                isStartFinish = true;
                continue;
            }
            tempWalls.push([temp, num]);
        }
    } else {
        if ( vertical.length === 2 ) { return; }
        for ( let temp of vertical ) {
            if ( (num === startNode.data.row && temp === startNode.data.col) ||
                 (num === finishNode.data.row && temp === finishNode.data.col) ) {
                isStartFinish = true;
                continue;
            }
            tempWalls.push([num, temp]);
        }
    }

    if ( !isStartFinish ) {
        tempWalls.splice(generateRandomEvenNumber(tempWalls.length), 1);
    }
    for ( let wall of tempWalls ) {
        walls.push(wall);
    }
}

function range(length) {
    let result = [];
    for ( let i=0; i<length; i++ ) {
        result.push(i);
    }
    return result;
}

function generateRandomOddNumber(array) {
    let max = array.length - 1;
    let randomNum = Math.floor(Math.random() * max);
    if ( randomNum % 2 === 0 ) {
        randomNum += 1;
    }
    return array[randomNum];
}

function generateRandomEvenNumber(max) {
  let randomNum = Math.floor(Math.random() * max);
  if ( randomNum % 2 !== 0 ) {
      randomNum += 1;
  }
  return randomNum;
}
