import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { PCFSoftShadowMap, Vector3 } from "three";
import useStore from "../state";
import Plane from "./card/Plane";
import Deck from "./Deck";
import Header from "./gui/Header";
import Player from "./Player";
import Opponent from "./players/Opponent";

const Game: React.FC<{}> = () => {
  const three = useThree();
  const next = useStore.useDeck().next;

  const clearTooltip = useStore.useClearTooltip();

  const d = 20;

  useEffect(() => {
    three.camera.position.set(0, 25, 60);
    // three.camera.position.set(15, 25, 60);
    three.camera.lookAt(new Vector3(0, 0, 0));
    three.gl.shadowMap.enabled = true;
    three.gl.shadowMap.type = PCFSoftShadowMap;

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
      {/* <ambientLight intensity={0.5} color={0xffffff} /> */}
      <directionalLight
        position={new Vector3(5, 15, 20)}
        castShadow={true}
        shadow-camera-left={-d}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-bottom={-d}
      />
      <Deck />
      <Header />

      <Plane />

      <Player number={0} />
      <Opponent number={1} />
    </>
  );
};

export default Game;
