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
      console.log(grid)
      grid.forEach(row => {
         console.log(JSON.stringify(row, null, 1))
      })
   }

   const handleClick = (e, pos) => {
      console.log(" 🐛: handleClick -> e, pos", e, pos)
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

   const handleMouseDown = e => {
      e.preventDefault() // to prevent unintended dragging default
      setIsWall(!isWall)
      item.isWall = !item.isWall
   }
   const handleHover = () => {
      // if the user has mouse clicked down...
      if (isMouseDown.current) {
         setIsWall(!isWall)
      }
   }

   return (
      <StyledNode
         draggable="false"
         transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
         }}
         animate={isWall ? "wall" : "default"}
         variants={variants}
         whileHover={{ scale: 1.1 }}
         onMouseDown={handleMouseDown}
         onHoverStart={handleHover}
      />
   )
}
