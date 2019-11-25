import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const Topbar = () => {
   return (
      <AppBar className={classes.topBar} position="static">
         <Toolbar className={classes.toolbar}>
            <img alt="Logo" src="/images/layers.svg" />
            <h4 style={{ marginLeft: "10px", color: "#424242" }}>
               Pathfinding Visualizer
            </h4>
         </Toolbar>
      </AppBar>
   );
};
