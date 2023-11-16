import React, { useState } from "react";
import "./Navigator.css";

export default function Navigator(props)
{
  const [algorithm, setAlgorithm] = useState("Run Algorithm");

  function runAlgorithm()
  {
    switch(algorithm)
    {
      case "Run Breadth First Search":
        props.runBFS();
        break;

      case "Run Depth First Search":
        props.runDFS();
        break;

      case "Run Greedy Best First Search":
        props.runGBFS();
        break;

      case "Run Dijkstra's Algorithm":
        props.runDijkstra();
        break;

      case "Run A* Algorithm":
        props.runAStar();
        break;

      default:
        break;
    }
  }

  return (
    <>
      <Navbar>
        <NavItem open = { props.open } setOpen = { props.setOpen } callbackFn = { props.setOpen }
          name = "selectAlgorithm" title = "Select Algorithm ⬇" >
          <DropdownMenu open={ props.open } setOpen={ props.setOpen } algorithm = { algorithm }
            setAlgorithm = { setAlgorithm }/>
        </NavItem>
        <NavItem callbackFn = { runAlgorithm } name = { "runAlgorithm" } title = { algorithm }/>
        <NavItem callbackFn = { props.generateMaze } state = { props.state } name = { "generateMaze" }
          title="Generate Maze"/>
        <NavItem callbackFn = { props.clearWallsAndWeights }
          state = { props.state } name = { "clearWallsAndWeights" } title = "Clear Walls and Weights"/>
        <NavItem callbackFn = { props.clearPath } state = { props.state } name = { "clearPath" } title = "Clear Path"/>
        <NavItem callbackFn = { props.clearGrid } state = { props.state } name = { "clearGrid" } title = "Clear Grid"/>
      </Navbar>
    </>
  );
}

function Navbar(props)
{
  return (
    <nav className = "navbar" >
      <ul className = "navbar-nav" >{ props.children }</ul>
    </nav>
  );
}

function NavItem(props)
{
  const buttonDictionary = {
    "selectAlgorithm":"button select-algorithm-button",
    "runAlgorithm":"button run-algorithm-button",
    "generateMaze":"button generate-maze-button",
    "clearWallsAndWeights":"button clear-walls-and-weights-button",
    "clearPath":"button clear-path-button",
    "clearGrid":"button clear-grid-button"
  };

  return (
    <li className="nav-item" >
      <p className={ buttonDictionary[props.name] }
        onClick={ () => props.title === "Run Algorithm" ? alert("Select an algorithm!")
        : props.name !== "selectAlgorithm"
        ? props.callbackFn()
        : props.setOpen(!props.open)
        }>
        { props.title }
      </p>
      { props.open && props.children }
    </li>
  );
}

function DropdownMenu(props)
{
  const algorithmDictionary = {
    "dfs":"Run Depth First Search",
    "bfs":"Run Breadth First Search",
    "gbfs":"Run Greedy Best First Search",
    "dijsktra":"Run Dijkstra's Algorithm",
    "astar":"Run A* Algorithm",
  };

  function DropdownItem(props)
  {
    return (
      <p className="menu-item" onClick={() => [
        (props.setAlgorithm(algorithmDictionary[props.name])),
        props.setOpen(!props.open)]
      }>
        { props.children }
      </p>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem name={ "dfs"} { ...props } >Depth First Search</DropdownItem>
      <DropdownItem name={ "bfs" } { ...props }>Breadth First Search</DropdownItem>
      <DropdownItem name={"gbfs"} { ...props }>Greedy Best First Search</DropdownItem>
      <DropdownItem name={"dijsktra"} { ...props }>Dijkstra</DropdownItem>
      <DropdownItem name={"astar"} { ...props }>A*</DropdownItem>
    </div>
  );
}