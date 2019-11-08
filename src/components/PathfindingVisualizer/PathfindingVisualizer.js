import React, { useState } from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";

export const PathfindingVisualizer = () => {
   const nodes = []; // 2D Array

   const [startNode, setStartNode] = useState([1, 1]);
   const [endNode, setEndNode] = useState([15, 15]);
   let draggedNode = "";

   console.log(startNode);

   // create grid
   for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 60; col++) {
         currentRow.push([]);
      }
      nodes.push(currentRow);
   }

   function handleSetStartNode(coor) {
      console.log(coor);
      setStartNode(coor);
   }

   function handleDragStart(event, pos) {
      console.log("dragstart-event)", event.target);
      console.log("start-pos)", pos);
      if (event.target.classList.contains("startNode")) {
         draggedNode = "startNode";
      } else if (event.target.classList.contains("endNode")) {
         draggedNode = "endNode";
      }
   }

   function handleDragEnter(event) {
      event.preventDefault();
      console.log("dragenter-event)", event.target);
   }

   function handleDrop(event, pos) {
      event.preventDefault();
      console.log("drop-event)", event.target);
      console.log("drop-pos", pos);

      if (draggedNode === "startNode") {
         setStartNode(pos);
      } else if (draggedNode === "endNode") {
         setEndNode(pos);
      }
   }

   function handleDragOver(event) {
      event.preventDefault();
   }

   return (
      <div className="grid">
         {nodes.map((row, rindx) => {
            return (
               <div key={rindx} className="row">
                  {row.map((col, cindx) => (
                     <Node
                        key={cindx}
                        pos={[rindx, cindx]}
                        startNode={startNode}
                        endNode={endNode}
                        handleSetStartNode={handleSetStartNode}
                        handleDragStart={handleDragStart}
                        handleDragEnter={handleDragEnter}
                        handleDrop={handleDrop}
                        handleDragOver={handleDragOver}
                     />
                  ))}
               </div>
            );
         })}
      </div>
   );
};
