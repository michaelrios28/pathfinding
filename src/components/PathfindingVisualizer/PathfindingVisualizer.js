import React, { useState } from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";
import { aStarAlgo } from "../helpers/AStar";

export const PathfindingVisualizer = () => {
   const nodes = []; // 2D Array
   const [startNode, setStartNode] = useState([0, 0]);
   const [endNode, setEndNode] = useState([59, 29]);
   const [mouseDown, setMouseDown] = useState(false);

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
      } else if (event.target.classList.contains("endNode")) {
         draggedNode = "endNode";
      }
   }

   function handleDrop(event, pos) {
      event.preventDefault();
      event.target.style.backgroundColor = "";
      if (draggedNode === "startNode") {
         setStartNode(pos);
      } else if (draggedNode === "endNode") {
         setEndNode(pos);
      }
   }

   function handleMouseDown(event, pos) {
      if (
         JSON.stringify(pos) !== JSON.stringify(startNode) &&
         JSON.stringify(pos) !== JSON.stringify(endNode)
      ) {
         setMouseDown(true);
         console.log(pos);
      }
   }

   function handleMouseOver(event, pos) {
      if (mouseDown) console.log(pos);
   }

   function handleMouseUp(event, pos) {
      setMouseDown(false);
      console.log(pos);
   }

   aStarAlgo.init(nodes);
   console.log(nodes);

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
                        // handleClick={handleClick}
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
