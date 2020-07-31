import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "../Data/pokeData";
import history from 'history'

import axios from "axios";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
    width: "130px",
    height: "130px",
  },
  label: {
    textTransform: "capitalize",
    textAlign: "center",
  },
});

const Pokedex = (props) => {
  const [pokemonData, setPokemonData] = useState(mockData);
  const classes = useStyles();
  const { history } = props;
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const pokemonGrid = (pokeId) => {
    const { id, name, sprite } = pokemonData[pokeId];

    return (
      <Grid item xs={12} sm={4} key={pokeId}>
        <Card onClick={() => history.push(`/${pokeId}`)}>
          <CardMedia className={classes.cardMedia} image={sprite} />
          <CardContent className={classes.label}>
            <Typography> {`${id}. ${name}`} </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const pokemons = Object.keys(pokemonData).map((pokeId) =>
    pokemonGrid(pokeId)
  );

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar />
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={4} className={classes.pokedexContainer}>
          {pokemons}
        </Grid>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
};

export default Pokedex;
