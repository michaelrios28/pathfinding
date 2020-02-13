import React, { useRef, useEffect, useState } from "react"
import VisualizerHeader from "./VisualizerHeader"
import { chunk, flatten, clamp } from "lodash"
import styled from "styled-components"
import swap from "lodash-move"
import { motion, useAnimation } from "framer-motion"

const StyledNode = styled(motion.div)`
   flex: 1 0 auto;
   background-color: #eee;
   border-radius: 5px;
   margin: 4px;
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

   const controls = useAnimation()
   useEffect(() => {
      controls.start(i => {
         console.log("i", i)
         return {
            opacity: 0
         }
      })
   }, [])

   return (
      <React.Fragment>
         <VisualizerHeader />
         <Grid className="grid">
            {grid.map((row, rindx) => {
               return (
                  <Row key={rindx}>
                     {row.map((col, cindx) => (
                        <Node
                           item={col}
                           key={`${cindx}, ${rindx}`}
                           pos={[cindx, rindx]}
                        />
                     ))}
                  </Row>
               )
            })}
         </Grid>
      </React.Fragment>
   )
}

const Node = ({ item }) => {
   console.log(" 🐛: Node -> item", item)

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

   const handleNodeClick = () => {
      item.isWall = !isWall
      setIsWall(!isWall)
   }

   return (
      <StyledNode
         transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
         }}
         animate={isWall ? "wall" : "default"}
         variants={variants}
         onClick={handleNodeClick}
         whileHover={{ scale: 1.2 }}
         whileTap={{ scale: 0.8 }}
      />
   )
}
