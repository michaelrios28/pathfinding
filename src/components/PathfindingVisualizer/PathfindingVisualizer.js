import React, { useState } from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";

export const PathfindingVisualizer = () => {
   const nodes = []; // 2D Array

   const [startNode, setStartNode] = useState([1, 1]);
   const [endNode, setEndNode] = useState([15, 15]);
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
                     />
                  ))}
               </div>
            );
         })}
      </div>
   );
};
