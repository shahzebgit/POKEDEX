import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./Components/pokemon";
import Pokedex from "./Components/pokedex";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Pokedex {...props} />} />
        <Route
          exact
          path="/:pokeId"
          render={(props) => <Pokemon {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
