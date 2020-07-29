import React from "react";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const { pokeId } = useParams();
  return <div>{`This is Pokemon Page #${pokeId}`}</div>;
};

export default Pokemon;
