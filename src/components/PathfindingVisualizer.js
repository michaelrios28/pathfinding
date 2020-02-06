import React, { useRef } from "react"
import VisualizerHeader from "./VisualizerHeader"
import { chunk, flatten, clamp } from "lodash"
import styled from "styled-components"
import { useDrag, useGesture } from "react-use-gesture"
import { useSprings, animated, interpolate } from "react-spring"
import swap from "lodash-move"
import "./styles.css"

const Node = styled(animated.div)`
   width: 30px;
   height: 30px;
   background-color: #eee;
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

const layout = i => {
   const row = Math.floor(i / 30)
   const col = i % 30
   return [35 * col, 35 * row]
}

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, x, y) => index => {
   if (down && index === originalIndex) {
      let [tempx, tempy] = layout(curIndex)
      return {
         x: tempx + x,
         y: tempy + y,
         scale: 1.1,
         zIndex: "1",
         immediate: false
      }
   }
   let [tempx, tempy] = layout(order.indexOf(index))
   return { x: tempx, y: tempy, scale: 1, zIndex: "0", immediate: false }
}

export const PathfindingVisualizer = () => {
   let items = new Array(200).fill("")
   const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the order of the array
   const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

   const bind = useDrag(({ args: [originalIndex], down, movement: [x, y] }) => {
      const curIndex = order.current.indexOf(originalIndex)
      let [tempx, tempy] = layout(curIndex)
      const curCol = clamp(Math.round((tempx + x) / 35), 0, 30 - 1)
      const curRow = clamp(
         Math.round((tempy + y) / 35),
         0,
         Math.floor(items.length / 30)
      )
      const index = curRow * 30 + curCol
      const newOrder = swap(order.current, curIndex, index)
      setSprings(fn(newOrder, down, originalIndex, curIndex, x, y)) // Feed springs new style data, they'll animate the view without causing a single render
      if (!down) order.current = newOrder
   })

   return (
      <React.Fragment>
         <VisualizerHeader />
         <Grid className="grid">
            {springs.map(({ zIndex, x, y, scale }, i) => (
               <Node
                  {...(i === 1 ? { ...bind(i) } : null)}
                  key={i}
                  style={{
                     zIndex,
                     transform: interpolate(
                        [x, y, scale],
                        (x, y, scale) =>
                           `translate3d(${x}px,${y}px,0) scale(${scale})`
                     )
                  }}
               />
            ))}
         </Grid>
      </React.Fragment>
   )
}
