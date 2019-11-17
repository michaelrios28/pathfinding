import React from "react";
import { render, cleanup } from "@testing-library/react";
import { PathfindingVisualizer } from "../components/PathfindingVisualizer/PathfindingVisualizer";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("grid renders", () => {
   const { getByTestId } = render(<PathfindingVisualizer />);
   expect(getByTestId("grid")).toBeInTheDocument();
});
