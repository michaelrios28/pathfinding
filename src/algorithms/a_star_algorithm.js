// A* Algo
// returns visited nodes in order (maybe ?)
// not the quickest solution. Will be using lists
// TODO: replace w/ Binary heap

const COLUMN_COUNT = 80;
const ROW_COUNT = 40;

export const aStarAlgo = {
   grid: [],

   init: function() {
      // create grid
      for (let x = 0; x < COLUMN_COUNT; x++) {
         this.grid[x] = []; // inner array
         for (let y = 0; y < ROW_COUNT; y++) {
            this.grid[x][y] = {};
         }
      }

      for (let x = 0; x < this.grid.length; x++) {
         for (let y = 0; y < this.grid[0].length; y++) {
            this.grid[x][y].f = 0;
            this.grid[x][y].g = 0;
            this.grid[x][y].h = 0;
            this.grid[x][y].debug = "";
            this.grid[x][y].parent = null;
            this.grid[x][y].isWall = false;
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
