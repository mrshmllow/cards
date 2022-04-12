import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Vector3 } from "three";
import useStore from "../state";
import Deck from "./Deck";
import Header from "./gui/Header";
import Player from "./Player";
import Opponent from "./players/Opponent";

const Game: React.FC<{}> = () => {
  const three = useThree();
  three.camera.position.set(0, 25, 60);
  three.camera.lookAt(new Vector3(0, 0, 0));
  const next = useStore.useDeck().next;

  const clearTooltip = useStore.useClearTooltip();

  useEffect(() => {
    document.addEventListener("mousemove", () => {
      if (three.raycaster.intersectObjects(three.scene.children).length === 0)
        clearTooltip();
    });
  }, []);
  useEffect(() => {
    console.log("KNOWN NEXT:", next);
  }, [next]);

  return (
    <>
      <ambientLight intensity={0.5} color={0xffffff} />
      {/* <directionalLight /> */}
      <Deck />
      <Header />
      <Player number={0} />
      <Opponent number={1} />
    </>
  );
};

export default Game;
