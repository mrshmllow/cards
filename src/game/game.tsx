import { useThree } from "@react-three/fiber";
// import useStore from "../state";
import React from "react";
import { Vector3 } from "three";
import Deck from "./Deck";
import Player from "./Player";

const Game: React.FC<{}> = () => {
  const three = useThree();
  three.camera.position.set(0, 25, 60);
  three.camera.lookAt(new Vector3(0, 0, 0));

  return (
    <>
      <ambientLight intensity={0.5} color={0xffffff} />
      {/* <directionalLight /> */}
      <Deck />
      <Player />
    </>
  );
};

export default Game;
