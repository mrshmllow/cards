import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Vector3 } from "three";
import useStore from "../state";
import Deck from "./Deck";
import Player from "./Player";

const Game: React.FC<{}> = () => {
  const three = useThree();
  three.camera.position.set(0, 25, 60);
  three.camera.lookAt(new Vector3(0, 0, 0));

  const clearTooltip = useStore.useClearTooltip();

  useEffect(() => {
    document.addEventListener("mousemove", () => {
      if (three.raycaster.intersectObjects(three.scene.children).length === 0)
        clearTooltip();
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} color={0xffffff} />
      {/* <directionalLight /> */}
      <Deck />
      <Player number={0} />
    </>
  );
};

export default Game;
