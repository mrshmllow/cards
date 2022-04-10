import { Canvas, useThree } from "@react-three/fiber";
// import useStore from "../state";
import React from "react";
import Deck from "./Deck";
import Player from "./Player";

const Game: React.FC<{}> = () => {
  const three = useThree();
  three.camera.position.set(0, 25, 60);

  return (
    <>
      <ambientLight />

      <Deck />
      <Player />
    </>
  );
};

export default Game;
