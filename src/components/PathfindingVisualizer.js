import React from "react";
import { aStarAlgo } from "../algorithms/a_star_algorithm";
import VisualizerHeader from "./VisualizerHeader";

export const PathfindingVisualizer = () => {
   // create grid
   aStarAlgo.init();

   return (
      <div className="root">
         <VisualizerHeader />

         <div className="grid" data-testid="grid">
            {aStarAlgo.grid[0].map((row, rindx) => {
               return (
                  <div key={rindx} className="row">
                     {aStarAlgo.grid.map((col, cindx) => (
                        <div />
                     ))}
                  </div>
               );
            })}
         </div>
      </div>
   );
};
