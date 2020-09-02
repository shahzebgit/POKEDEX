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
  CardActionArea,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import mockData from "../../Data/pokeData";
import Color from "color";
import axios from "axios";

import "./pokedex.css";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.8em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(61,125,202)",
      outline: "1px solid slategrey",
    },
  },
  search: {
    display: "flex",
    padding: "2px 10px 1px 15px",

    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    borderRadius: "12px",
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,

    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.9)
        .fade(0.5)}`,
    },
  }),
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

  const pokedexGrid = (pokeId) => {
    const { id, name, sprite } = pokemonData[pokeId];
    return (
      <Grid item xs={12} sm={6} md={3} key={pokeId}>
        <Card
          onClick={() => history.push(`/${name}`)}
          className={classes.card}
          variant="outlined"
        >
          <CardActionArea>
            {sprite ? (
              <CardMedia className="cardMedia1" image={sprite} />
            ) : (
              <CircularProgress />
            )}
            <CardContent className="label">
              <Typography> {`${id}. ${name}`} </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  const pokemons = Object.keys(pokemonData).map(
    (pokeId) =>
      pokemonData[pokeId].name.includes(searchFilter) && pokedexGrid(pokeId)
  );

  const pokemonLogo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/210px-International_Pok%C3%A9mon_logo.svg.png";

  return (
    <>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <div className={classes.search}>
            <SearchIcon className="searchIcon" />
            <InputBase
              placeholder="Search…"
              className="inputBase"
              onChange={handleSearchChange}
            />
          </div>
        <div className="image" >
          <img src={pokemonLogo} alt="pokemon" />
        </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={4} className="pokedexContainer">
          {pokemons}
        </Grid>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
};

export default Pokedex;
