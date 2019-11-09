// A* Algo
// returns visited nodes in order (maybe ?)
// not the quickest solution. Will be using lists
// TODO: replace w/ Binary heap
export let aStarAlgo = {
   init: function(grid) {
      for (let x = 0; x < grid.length; x++) {
         for (let y = 0; y < grid[0].length; y++) {
            grid[x][y].f = 0;
            grid[x][y].g = 0;
            grid[x][y].h = 0;
            grid[x][y].debug = "";
            grid[x][y].parent = null;

            console.log(grid[x][y]);
         }
      }
   }
};
