import React from "react";
import "./Node.css";

export const Node = props => {
   // Handle styling start and end nodes...
   let draggable = false;
   let className = "node "; // for styling
   if (JSON.stringify(props.pos) === JSON.stringify(props.startNode)) {
      // only start and end nodes are draggable
      draggable = true;
      // if it's the startNode, then give it a new color
      className += "startNode";
   } else if (JSON.stringify(props.pos) === JSON.stringify(props.endNode)) {
      // only start and end nodes are draggable
      draggable = true;
      // if it's the endNode, give it a new class
      className += "endNode";
   }

   function handleClick() {
      console.log("props.pos", props.pos);
   }

   function handleDrop(event) {
      console.log("drop-event)", event.target);
      console.log("drop-event pos)", event.target.ref);
      console.log("(drop) props.pos", props.pos);

      props.handleSetStartNode(props.pos);
   }

   function handleDragOver(event) {
      event.preventDefault();
      console.log("dragover-event)", event.target);
      console.log("(dragover) props.pos", props.pos);
      console.log("event classname: ", event.target.className);
   }

   return (
      <div
         draggable={draggable}
         onDragOver={handleDragOver}
         onClick={handleClick}
         className={className}
         onDrop={handleDrop}
      />
   );
};
