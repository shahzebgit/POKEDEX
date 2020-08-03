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
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import mockData from "../Data/pokeData";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "0px",
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
  title: {
    color: "white",
  },
  search: {
    display: "flex",
    padding: "2px 10px 1px 15px",
    margin: "0px 10px",
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    borderRadius: "12px",
  },
  searchIcon: {
    paddingTop: "3px",
  },
  inputBase: {
    width: "150px",
    "&:hover": {
      width: "190px",
    },
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState(mockData);
  const [searchFilter, setSearchFilter] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

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

  const pokemons = Object.keys(pokemonData).map(
    (pokeId) =>
      pokemonData[pokeId].name.includes(searchFilter) && pokemonGrid(pokeId)
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Pokemon
          </Typography>
          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search…"
              className={classes.inputBase}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
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
