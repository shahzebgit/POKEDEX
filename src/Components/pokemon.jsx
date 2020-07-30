import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import axios from "axios";
import mockData from "../Data/pokeData";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { pokeId } = useParams();
  const [pokemon, setPokemon] = useState(mockData[`${pokeId}`]);

  const generatePokemonDetails = (pokemon) => {
    const { id, name, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h1">
          {`${id}.`}
          <img src={front_default} alt="text" />
        </Typography>
        <img src={fullImageUrl} alt="MainImage" />
        <Typography>Types:</Typography>
        {types.map((p) => {
          const { type } = p;
          const { name } = type;
          return <Typography key={name}>{`${name}`}</Typography>;
        })}
      </>
    );
  };
  return <>{generatePokemonDetails()}</>;
};
export default Pokemon;
