// A* Algo
// returns visited nodes in order (maybe ?)
// not the quickest solution. Will be using lists
// TODO: replace w/ Binary heap
export const aStarAlgo = {
   grid: [],

   init: function() {
      // create grid
      for (let row = 0; row < 40; row++) {
         const currentRow = [];
         for (let col = 0; col < 80; col++) {
            currentRow.push([]);
         }
         this.grid.push(currentRow);
      }

      for (let row = 0; row < this.grid.length; row++) {
         for (let col = 0; col < this.grid[0].length; col++) {
            this.grid[row][col].f = 0;
            this.grid[row][col].g = 0;
            this.grid[row][col].h = 0;
            this.grid[row][col].debug = "";
            this.grid[row][col].parent = null;
            this.grid[row][col].isWall = false;
         }
      }
   },

   search: function(start, end) {
      let openList = [];
      let closedList = [];
      openList.push(start);

      console.log("start", start);
      console.log("end", end);
      console.log("openList", openList);

      // LOOP
      while (openList.length > 0) {
         let current = openList.pop(); // remove current from open
         closedList.push(current);
         console.log("current", current);
         // Do something with current
      }
   }
};
