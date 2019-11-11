import React from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";
import { aStarAlgo } from "../helpers/AStar";

export const PathfindingVisualizer = () => {
   const nodes = []; // 2D Array
   let startNode = [0, 0];
   let endNode = [59, 29];
   let mouseDown = false;
   let draggedNode = "";

   // create grid
   for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 60; col++) {
         currentRow.push([]);
      }
      nodes.push(currentRow);
   }
   for (let x = 0; x < nodes.length; x++) {
      for (let y = 0; y < nodes[0].length; y++) {
         nodes[x][y].isWall = false;
      }
   }

   function handleDragStart(event, pos) {
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
      if (mouseDown) {
         console.log(pos);
         event.target.classList.add("wall");
      }
   }

   function handleMouseUp() {
      mouseDown = false;
   }

   aStarAlgo.init(nodes);

   return (
      <div className="grid">
         {nodes.map((row, rindx) => {
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
