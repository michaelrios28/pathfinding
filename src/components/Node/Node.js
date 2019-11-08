import React from "react";
import "./Node.css";

export const Node = props => {
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

   function handleClick() {
      console.log("props.pos", props.pos);
   }

   return (
      <div
         draggable={draggable}
         onDragStart={e => props.handleDragStart(e, props.pos)}
         onClick={handleClick}
         className={className}
         onDrop={e => props.handleDrop(e, props.pos)}
         // need this for drop to trigger
         onDragOver={e => e.preventDefault()}
      />
   );
};
