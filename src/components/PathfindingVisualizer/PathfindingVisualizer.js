import React from "react";
import { Node } from "../Node/Node";
import { aStarAlgo } from "../../algorithms/a_star_algorithm";
import { Badge } from "antd";
import { Button } from "antd";

import "./PathfindingVisualizer.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

export const PathfindingVisualizer = () => {
   let startNode = [10, 5];
   let endNode = [69, 5];
   let mouseDown = false;
   let draggedNode = "";

   // create grid
   aStarAlgo.init();

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
         aStarAlgo.grid[pos[0]][pos[1]].isWall = true;
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
         aStarAlgo.grid[pos[0]][pos[1]].isWall = true;
      }
   }

   function handleMouseUp() {
      mouseDown = false;
   }

   function handleClick() {
      console.log("aStarAlgo.grid: ", aStarAlgo.grid);
      aStarAlgo.search(startNode, endNode);
   }

   return (
      <React.Fragment>
         <Button type="primary" onClick={handleClick}>
            Visualize
         </Button>

         <div className="labels">
            <Badge color="#1de9b6" text="Start Node" />
            <br />
            <Badge color="#ff1744" text="End Node" />
            <br />
            <Badge color="#424242" text="Wall Node" />
            <br />
         </div>

         <div className="grid" data-testid="grid">
            {aStarAlgo.grid[0].map((row, rindx) => {
               return (
                  <div key={rindx} className="row">
                     {aStarAlgo.grid.map((col, cindx) => (
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
      </React.Fragment>
   );
};
