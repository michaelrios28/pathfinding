import React from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";
import { aStarAlgo } from "../helpers/AStar";
import Fab from "@material-ui/core/Fab";

export const PathfindingVisualizer = () => {
   let startNode = [0, 0];
   let endNode = [79, 29];
   let mouseDown = false;
   let draggedNode = "";

   // create grid
   aStarAlgo.init();
   console.log(aStarAlgo.grid);

   function handleDragStart(event) {
      if (event.target.classList.contains("startNode")) {
         draggedNode = "startNode";
         event.target.classList.remove("startNode");
      } else if (event.target.classList.contains("endNode")) {
         draggedNode = "endNode";
         event.target.classList.remove("endNode");
      }
      event.target.draggable = false;
   }

   function handleDrop(event, pos) {
      event.preventDefault();
      event.target.style.backgroundColor = "";
      if (draggedNode === "startNode") {
         startNode = pos;
         event.target.classList.add("startNode");
      } else if (draggedNode === "endNode") {
         endNode = pos;
         event.target.classList.add("endNode");
      }
      event.target.draggable = true;
   }

   function handleMouseDown(event, pos) {
      if (
         JSON.stringify(pos) !== JSON.stringify(startNode) &&
         JSON.stringify(pos) !== JSON.stringify(endNode)
      ) {
         mouseDown = true;
         event.target.classList.add("wall");
         aStarAlgo.grid[pos[1]][pos[0]].isWall = true;
      }
   }

   function handleMouseOver(event, pos) {
      if (
         mouseDown &&
         JSON.stringify(pos) !== JSON.stringify(startNode) &&
         JSON.stringify(pos) !== JSON.stringify(endNode)
      ) {
         console.log(pos);
         event.target.classList.add("wall");
         aStarAlgo.grid[pos[1]][pos[0]].isWall = true;
      }
   }

   function handleMouseUp() {
      mouseDown = false;
   }

   function handleClick() {
      console.log("array", aStarAlgo.grid);
   }

   return (
      <React.Fragment>
         <Fab
            variant="extended"
            aria-label="like"
            onClick={handleClick}
            style={{
               backgroundColor: "#0091ea",
               color: "white",
               margin: "10px"
            }}
         >
            Visualize
         </Fab>
         <div className="grid">
            {aStarAlgo.grid.map((col, cindx) => {
               return (
                  <div key={cindx} className="row">
                     {col.map((row, rindx) => (
                        <Node
                           key={rindx}
                           pos={[rindx, cindx]}
                           startNode={startNode}
                           endNode={endNode}
                           handleDragStart={handleDragStart}
                           handleDrop={handleDrop}
                           handleMouseDown={handleMouseDown}
                           handleMouseOver={handleMouseOver}
                           handleMouseUp={handleMouseUp}
                           mouseDown={mouseDown}
                        />
                     ))}
                  </div>
               );
            })}
         </div>
      </React.Fragment>
   );
};
