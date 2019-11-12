// A* Algo
// returns visited nodes in order (maybe ?)
// not the quickest solution. Will be using lists
// TODO: replace w/ Binary heap
export let aStarAlgo = {
   grid: [],

   init: function() {
      // create grid
      for (let row = 0; row < 30; row++) {
         const currentRow = [];
         for (let col = 0; col < 80; col++) {
            currentRow.push([]);
         }
         this.grid.push(currentRow);
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

   search: function(grid, start, end) {
      let openList = [];
      let closedList = [];

      openList.push(start);
   }
};
