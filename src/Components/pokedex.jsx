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
import mockData from "../Data/pokeData";
import Color from "color";

import axios from "axios";

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
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  cardMedia: {
    margin: "auto",
    width: "130px",
    height: "130px",
  },
  image: {
    display: "flex",
    marginLeft: "32%",
    paddingTop: "3px",
    paddingBottom: "8px",
    minWidth: "450px",
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
    // "&:hover": {
    //   width: "190px",
    // },
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

  const pokemonGrid = (pokeId) => {
    const { id, name, sprite } = pokemonData[pokeId];
    return (
      <Grid item xs={12} sm={6} md={3} key={pokeId}>
        <Card
          onClick={() => history.push(`/${pokeId}`)}
          className={classes.card}
          variant="outlined"
        >
          <CardActionArea>
            <CardMedia className={classes.cardMedia} image={sprite} />
            <CardContent className={classes.label}>
              <Typography> {`${id}. ${name}`} </Typography>
            </CardContent>
          </CardActionArea>
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
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search…"
              className={classes.inputBase}
              onChange={handleSearchChange}
            />
          </div>
          <div className={classes.image}>
            <img
              src="//upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/180px-International_Pok%C3%A9mon_logo.svg.png"
              alt="pokemon"
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
