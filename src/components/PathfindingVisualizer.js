import React, { useState, useRef } from "react"
import VisualizerHeader from "./VisualizerHeader"
import styled from "styled-components"
import { motion } from "framer-motion"

const StyledNode = styled(motion.div)`
   flex: 1 0 auto;
   background-color: #eee;
   border-radius: 5px;
   margin: 3px;
   :before {
      padding-top: 100%;
      content: "";
      display: block;
   }
`
const Grid = styled.div`
   align-items: center;
   margin: 2%;
`
const Row = styled.div`
   display: flex;
   justify-content: center;
`

export const PathfindingVisualizer = () => {
   const isMouseDown = useRef(false)

   // temporary create grid
   let grid = []
   // rows
   for (let x = 0; x < 30; x++) {
      grid[x] = [] // inner array
      //cols
      for (let y = 0; y < 50; y++) {
         grid[x][y] = {
            f: 0,
            g: 0,
            h: 0,
            parent: null,
            isWall: false,
            pos: `${x}, ${y}`
         }
      }
   }

   const handleVisualizerBtnClick = () => {
      console.log("VisualizerBtnClick!")
      grid[0][0].isWall = true
      console.log(JSON.stringify(grid, 0))
   }

   const handleClick = (e, pos) => {
      console.log(" 🐛: handleClick -> e, pos", e, pos)
   }

   const handleGridClick = e => {
      console.log("Grid Click")
   }

   const handleMouseDown = () => {
      isMouseDown.current = true
   }

   const handleMouseUp = () => {
      isMouseDown.current = false
   }

   return (
      <React.Fragment>
         <VisualizerHeader handleClick={handleVisualizerBtnClick} />
         <Grid
            draggable="false"
            className="grid"
            onClick={handleGridClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
         >
            {grid.map((row, rindx) => {
               return (
                  <Row key={rindx} draggable="false">
                     {row.map((col, cindx) => (
                        <Node
                           onClick={e => handleClick(e, [rindx, cindx])}
                           item={col}
                           key={`${cindx}, ${rindx}`}
                           pos={[cindx, rindx]}
                           isMouseDown={isMouseDown}
                        />
                     ))}
                  </Row>
               )
            })}
         </Grid>
      </React.Fragment>
   )
}

const Node = ({ item, isMouseDown }) => {
   const variants = {
      wall: {
         backgroundColor: "#424242"
      },
      default: {
         backgroundColor: "#eee"
      }
   }

   // create some local state for the node...
   const [isWall, setIsWall] = useState(item.isWall)

   const onHover = () => {
      if (isMouseDown.current) {
         setIsWall(!isWall)
      }
   }

   return (
      <StyledNode
         draggable="false"
         onMouseDown={e => e.preventDefault()} //disable unintended dragging
         transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
         }}
         animate={isWall ? "wall" : "default"}
         variants={variants}
         whileHover={{ scale: 1.1 }}
         // whileTap={{ scale: 0.8 }}
         onHoverStart={onHover}
      />
   )
}
