import React from "react";
import { Node } from "../Node/Node";
import { aStarAlgo } from "../../algorithms/a_star_algorithm";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import "./PathfindingVisualizer.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   visualizeButton: {
      background: "#2196f3",
      border: 0,
      borderRadius: 3,
      boxShadow: "0px 8px 15px rgba(33,150,243, 0.3)",
      transition: "box-shadow 300ms ease-in",
      color: "white",
      marginLeft: "2%",
      marginTop: "2%",
      // marginTop: "1%",
      "&:hover": {
         background: "#2196f3",
         boxShadow: "0px 12px 18px rgba(33,150,243, 0.4)"
      }
   },
   topBar: {
      background: "white",
      backgroundColor: "white",
      boxShadow: "none",
      borderBottom: "1px solid #f5f5f5",
      height: "50px"
   },
   toolbar: {
      height: "50px",
      minHeight: "50px"
   }
});

export const PathfindingVisualizer = () => {
   const classes = useStyles();

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
         <Button className={classes.visualizeButton}>
            <PlayArrowIcon style={{ marginRight: "5px" }} />
            Visualize
         </Button>
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
