import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./Components/Pokemon/pokemon.jsx";
import Pokedex from "./Components/Pokedex/pokedex.jsx";

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
