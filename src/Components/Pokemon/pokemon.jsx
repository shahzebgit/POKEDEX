import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";

import axios from "axios";
import { useParams } from "react-router-dom";

import "./pokemon.css";

const Pokemon = (props) => {
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
    const { id, name, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Card className="root">
          <CardContent >
            <Typography variant="h4" className="card">
              {name}
            </Typography>
            <div className="dot">
              <img src={fullImageUrl} alt="MainImage" className="cardMedia2" />
            </div>
            <div className="id-number">{`# ${id}`}</div>
          </CardContent>

          <CardContent className='card2'>
            <Typography  variant="h5" component="h2">
              About<br/>
            </Typography>
            <Typography variant="h6">
              Height: {height + 'm'} <br/>
              Weight: {weight + 'kg'}
            </Typography>
          </CardContent>

          <CardContent className="card3">
            <Typography variant="h5">Types:</Typography>
            {types.map((p) => {
              const { type } = p;
              const { name } = type;
              return (
                <Typography variant="h6" key={name}>{`${name}`}</Typography>
              );
            })}
          </CardContent>
        </Card>
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
