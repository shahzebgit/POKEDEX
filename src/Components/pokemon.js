import React from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { pokemonId } = useParams();
  return <div>{`This is Pokemon Page #${pokemonId}`}</div>;
};

export default Pokemon;
