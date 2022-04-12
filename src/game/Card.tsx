import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import Playlist from "../animation/Playlist";
import { CardTypes } from "../types/cards/card_types";

const Card: React.FC<{
  type: CardTypes;
  moving?: Vector3;
}> = ({ type, moving }) => {
  const three = useThree();
  const ref = useRef();
  const refrence = ref.current as unknown as Mesh<
    BufferGeometry,
    Material | Material[]
  >;

  useFrame(() => {
    if (moving) {
      refrence.position.lerp(moving, 0.1);
    }
  });

  useEffect(() => {
    moving = new Vector3(0, 0, 25);
  }, []);

  return (
    <mesh
      ref={ref}
      // position={new Vector3(0, 0, 25)}
      onPointerEnter={() => {
        if (type !== CardTypes.explosion) {
          moving = moving?.add(new Vector3(0, 2, 0));
          refrence.lookAt(three.camera.position);
        }
      }}
      onPointerLeave={() => {
        if (type !== CardTypes.explosion) {
          moving = moving?.add(new Vector3(0, -2, 0));
          refrence.rotation.set(0, 0, 0);
        }
      }}
    >
      <planeGeometry args={[18 / 2, 25 / 2]} />

      <Playlist
        animations={[
          {
            frame: 0,
            frames: 6,
            resolve: (frame) => `/assets/card/unturn${frame}.png`,
          },
          type === CardTypes.explosion
            ? {
                frame: 0,
                frames: 19,
                resolve: (frame) => `/assets/card/explosion${frame}.png`,
              }
            : type === CardTypes.future
            ? {
                frame: 0,
                frames: 1,
                resolve: (frame) => `/assets/card/future${frame}.png`,
              }
            : type === CardTypes.skip
            ? {
                frame: 0,
                frames: 4,
                resolve: (frame) => `/assets/card/skip${frame}.png`,
              }
            : {
                frame: 0,
                frames: 1,
                resolve: (frame) => `/assets/card/default${frame}.png`,
              },
        ]}
        loop={false}
        playing={true}
      />
    </mesh>
  );
};

export default Card;
