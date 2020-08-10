import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  cardMedia: {
    width: "200px",
    height: "200px",
    paddingTop:'40px'
  },
  dot: {
    height:'210px',
    width: '210px',
    backgroundColor: '#e6fefe',
    borderRadius:' 50%',
    display: 'inline-block',
  },
  root: {
    width: "500px",
    height: "500px",
    margin:'auto',
    textAlign: "center",
    backgroundColor:'#c6eced'
  },
  card: ({
    minWidth: 256,
    borderRadius: 16,
    textTransform: "capitalize",
  }),
  image: {
    width: "50px",
    height: "50px",
    textAlign: "center",

  },
  idNumber:{
    display:'inline-block',
    width:'40px',
    height:'25px',
    borderRadius:14,
    backgroundColor:'#a0cece',
    paddingTop:'5px',
    fontFamily:'Crimson Text,serif',

  }
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
    const { id, name, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Card className={classes.root}>
          <CardContent className={classes.card}>
            <Typography variant="h4">
              {name}
              {/* <img src={front_default} alt="text" className={classes.image} /> */}
            </Typography>
            <div className={classes.dot}>

            <img
              src={fullImageUrl}
              alt="MainImage"
              className={classes.cardMedia}
            />
            </div>
            <div className={classes.idNumber} >
              {`# ${id}`}
            </div>
            <Typography variant="h6">
              Height: {height} m <br />
              Weight: {weight} kg
            </Typography>

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
