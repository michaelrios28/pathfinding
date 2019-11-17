import { aStarAlgo } from "../algorithms/a_star_algorithm";
import React from "react";

test("creates grid correctly", () => {
   expect(aStarAlgo.grid.length).toEqual(0);
   aStarAlgo.init();
   expect(aStarAlgo.grid.length).toEqual(80);
});
