import React from "react";
import "./Node.css";

export const Node = props => {
   let className = "node "; // for styling

   // if it's the startNode, then give it a new color
   if (JSON.stringify(props.pos) === JSON.stringify(props.startNode)) {
      className += "startNode";
   }

   // if it's the endNode, give it a new class
   if (JSON.stringify(props.pos) === JSON.stringify(props.endNode)) {
      className += "endNode";
   }

   function handleClick() {
      console.log("props.pos", props.pos);
   }

   return <div onClick={handleClick} className={className} />;
};
