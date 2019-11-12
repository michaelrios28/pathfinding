import React from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";
import { aStarAlgo } from "../helpers/AStar";

export const PathfindingVisualizer = () => {
   let startNode = [0, 0];
   let endNode = [59, 29];
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
      }
   }

   function handleMouseUp() {
      mouseDown = false;
   }

   return (
      <div className="grid">
         {aStarAlgo.grid.map((row, rindx) => {
            return (
               <div key={rindx} className="row">
                  {row.map((col, cindx) => (
                     <Node
                        key={cindx}
                        pos={[cindx, rindx]}
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
   );
};
