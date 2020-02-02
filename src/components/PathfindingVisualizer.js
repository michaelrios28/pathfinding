import React, { useRef } from "react"
import VisualizerHeader from "./VisualizerHeader"
import { chunk, flatten, clamp } from "lodash"
import styled from "styled-components"
import { useDrag, useGesture } from "react-use-gesture"
import { useSprings, animated, interpolate } from "react-spring"
import swap from "lodash-move"
import "./styles.css"

const Node = styled(animated.div)`
   width: 20px;
   height: 20px;
   background-color: pink;
   margin: 2px;
   border-radius: 3px;
   position: absolute;
`

const Grid = styled.div`
   margin: 2%;
   position: relative;
   width: 100vw;
   height: 100vh;
`

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index => {
   return down && index === originalIndex
      ? {
           y: curIndex * 25 + y,
           scale: 1.1,
           zIndex: "1",
           shadow: 15,
           immediate: n => n === "y" || n === "zIndex"
        }
      : {
           y: order.indexOf(index) * 25,
           scale: 1,
           zIndex: "0",
           shadow: 1,
           immediate: false
        }
}
export const PathfindingVisualizer = () => {
   // temporary create grid
   let grid = []
   // rows
   for (let x = 0; x < 10; x++) {
      grid[x] = [] // inner array
      //cols
      for (let y = 0; y < 3; y++) {
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

   grid = flatten(grid) // make 2D array =>  1D array
   const order = useRef(grid.map((_, index) => index))
   console.log("order", order.current)

   const [springs, setSprings] = useSprings(grid.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

   // gesture ------------------
   const bind = useGesture({
      onDrag: ({ args: [originalIndex], down, movement: [, y] }) => {
         const curIndex = order.current.indexOf(originalIndex)
         const curRow = clamp(
            Math.round((curIndex * 25 + y) / 25),
            0,
            grid.length - 1
         )
         const newOrder = swap(order.current, curIndex, curRow)
         setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
         if (!down) order.current = newOrder
      }
   })
   // ---------------- gesture

   const handleClick = e => {
      console.log("grid", grid)
      console.log("order", order)
   }

   return (
      <React.Fragment>
         <VisualizerHeader handleClick={handleClick} />
         <Grid className="grid">
            {springs.map(({ zIndex, shadow, y, scale }, i) => (
               <Node
                  {...bind(i)}
                  key={i}
                  style={{
                     zIndex,
                     boxShadow: shadow.interpolate(
                        s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                     ),
                     transform: interpolate(
                        [y, scale],
                        (y, s) => `translate3d(0,${y}px,0) scale(${s})`
                     )
                  }}
               />
            ))}
         </Grid>
      </React.Fragment>
   )
}
