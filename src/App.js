import React from "react";
import { Switch, Route } from "react-router-dom";
import Pokemon from "./Components/pokemon";
import PokeDex from "./Components/pokedex";

function App() {
  return (
    <Switch>
      <Route path="/" render={(props) => <PokeDex {...props}/>}></Route>
      <Route
        path="/:pokemonId"
        render={(props) => <Pokemon {...props}/>}
      ></Route>
    </Switch>
  );
}

export default App;
