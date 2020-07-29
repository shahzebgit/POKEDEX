import React from "react";
import { Switch, Route } from "react-router-dom";
import Pokemon from "./Components/pokemon";
import Pokedex from "./Components/pokedex";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props}/>}/>
      <Route
        path="/:pokeId"
        render={(props) => <Pokemon {...props}/>}
      />
    </Switch>
  );
}

export default App;
