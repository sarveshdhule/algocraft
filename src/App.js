import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Sorting from "./components/Sorting/Sorting";
import Home from "./components/Home"
import TreeVisualizer from "./components/Tree/TreeVisualizer";
import BacktrackingVisualizer from "./components/Backtracking/BacktrackingVisualizer";
import ConvexHull from "./components/ConvexHull/ConvexHull";
import Pathfinding from "./components/Pathfinding/Pathfinding";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Switch>
                <Route path="/backtracking">
                  <BacktrackingVisualizer/>
                </Route>
                <Route path="/tree">
                  <TreeVisualizer/>
                </Route>
                <Route path="/sorting">
                  <Sorting/>
                </Route>
                <Route path="/convexhull">
                  <ConvexHull/>
                </Route>
                <Route path="/pathfinding">
                  <Pathfinding/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
