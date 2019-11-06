import React from "react";
import { Node } from "../Node/Node";
import "./PathfindingVisualizer.css";

export const PathfindingVisualizer = () => {
   const nodes = []; // 2D Array

   const startNode = [1, 1];
   const endNode = [15, 15];

   // create grid
   for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 60; col++) {
         currentRow.push([]);
      }
      nodes.push(currentRow);
   }

   return (
      <div className="grid">
         {nodes.map((row, rindx) => {
            return (
               <div className="row">
                  {row.map((col, cindx) => (
                     <Node
                        pos={[rindx, cindx]}
                        startNode={startNode}
                        endNode={endNode}
                     />
                  ))}
               </div>
            );
         })}
      </div>
   );
};
