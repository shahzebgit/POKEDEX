import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  cardMedia: {
    width: "300px",
    height: "300px",
  },
});

const Pokemon = (props) => {
  const classes = useStyles();
  const { pokeId } = useParams();
  const { history } = props;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((error) => {
        setPokemon(false);
      });
  }, [pokeId]);

  const generatePokemonDetails = () => {
    const { id, name, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        {`${id}.`}
        <Typography variant="h1">
          <img src={front_default} alt="text" />
        </Typography>
        <img src={fullImageUrl} alt="MainImage" className={classes.cardMedia} />

        <Typography variant="h4">Types:</Typography>
        {types.map((p) => {
          const { type } = p;
          const { name } = type;
          return <Typography variant="h6" key={name}>{`${name}`}</Typography>;
        })}

        <Typography variant="h5">
          Height: {height} <br />
          Weight: {weight}
        </Typography>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonDetails()}
      {pokemon === false && (
        <Typography variant="h1">Pokemon Not Found!!</Typography>
      )}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          Back to Main page
        </Button>
      )}
    </>
  );
};
export default Pokemon;
