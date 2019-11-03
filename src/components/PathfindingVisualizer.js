import React from "react";
import { Node } from "./Node";
import "./PathfindingVisualizer.css";

export const PathfindingVisualizer = () => {
   const nodes = []; // 2D Array

   // create grid
   console.log("in here");
   for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
         currentRow.push([]);
      }
      nodes.push(currentRow);
   }

   const test = nodes[0];
   console.log(test);

   return (
      <div className="grid">
         {nodes.map(row => {
            return (
               <div className="row">
                  {row.map(node => (
                     <Node />
                  ))}
               </div>
            );
         })}
      </div>
   );
};
