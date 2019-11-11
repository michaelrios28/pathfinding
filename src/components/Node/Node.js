import React, { useState } from "react";
import "./Node.css";

export const Node = props => {
   const [isWall, setIsWall] = useState(false);
   // Handle styling start and end nodes...
   let draggable = false;
   let className = "node "; // for styling
   if (JSON.stringify(props.pos) === JSON.stringify(props.startNode)) {
      // only start and end nodes are draggable
      // if it's the startNode, then give it a new color
      draggable = true;
      className += "startNode";
   } else if (JSON.stringify(props.pos) === JSON.stringify(props.endNode)) {
      // only start and end nodes are draggable
      // if it's the endNode, give it a new class
      draggable = true;
      className += "endNode";
   }

   if (isWall) {
      className += "wall";
   }

   function handleClick() {
      setIsWall(true);
   }

   return (
      <div
         //onClick={handleClick}
         onMouseDown={e => {
            if (
               !e.target.classList.contains("startNode") &&
               !e.target.classList.contains("endNode")
            ) {
               console.log(e.target.classList);
               setIsWall(true);
               props.handleMouseDown(e, props.pos);
            }
         }}
         onMouseOver={e => {
            if (props.mouseDown) {
               setIsWall(true);
               props.handleMouseOver(e, props.pos);
            }
         }}
         onMouseUp={e => props.handleMouseUp(e, props.pos)}
         className={className}
         draggable={draggable}
         onDragStart={e => props.handleDragStart(e, props.pos)}
         onDrop={e => props.handleDrop(e, props.pos)}
         //styling
         onDragEnter={e => (e.target.style.backgroundColor = "#cfd8dc")}
         onDragLeave={e => (e.target.style.backgroundColor = "")}
         // need this for drop to trigger
         onDragOver={e => e.preventDefault()}
      />
   );
};
