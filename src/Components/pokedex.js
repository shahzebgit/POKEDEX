import React, { useState } from "react";
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

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState(mockData);
  const classes = useStyles();

  const pokemonGrid = (pokeId) => {
    const { id, name } = pokemonData[`${pokeId}`];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
 
    return (
      <Grid item xs={12} sm={4} key={pokeId}>
        <Card>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
          />
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
