import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header.jsx"
import Pathfinder from "./components/Pathfinder/Pathfinder.jsx"

const App = () => {
    const numRows = 20;
    const numCols = 30;
    return (
      <>
        <Header />
        <Pathfinder numRows={numRows} numCols={numCols}/>
      </>
    )
}

export default App;
