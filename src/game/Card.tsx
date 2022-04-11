import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import Playlist from "../animation/Playlist";
import { CardTypes } from "../types/card_types";

const Card: React.FC<{ type: CardTypes; moving?: Vector3 }> = ({
  type,
  moving,
}) => {
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
        }
      }}
      onPointerLeave={() => {
        if (type !== CardTypes.explosion) {
          moving = moving?.add(new Vector3(0, -2, 0));
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
          {
            frame: 0,
            frames: 19,
            resolve: (frame) => `/assets/card/explosion${frame}.png`,
          },
        ]}
        loop={false}
        playing={true}
      />

      {/* 
      {animation === "default" ? (
        <Animation
          frames={1}
          frame={0}
          resolve={(frame) => `/assets/card/default${frame}.png`}
          playing={true}
          loop={false}
          onEnd={onAnimationEnd}
        />
      ) : animation === "unturn" ? (
        <Animation
          frames={6}
          frame={0}
          resolve={(frame) => `/assets/card/unturn${frame}.png`}
          playing={true}
          loop={false}
          onEnd={onAnimationEnd}
        />
      ) : animation === "explosion" ? (
        <Animation
          frames={19}
          frame={0}
          resolve={(frame) => `/assets/card/explosion${frame}.png`}
          playing={true}
          loop={false}
          onEnd={onAnimationEnd}
        />
      ) : animation === "future" ? (
        <Animation
          frames={1}
          frame={0}
          resolve={(frame) => `/assets/card/future${frame}.png`}
          playing={true}
          loop={false}
          onEnd={onAnimationEnd}
        />
      ) : animation === "skip" ? (
        <Animation
          frames={4}
          frame={0}
          resolve={(frame) => `/assets/card/skip${frame}.png`}
          playing={true}
          loop={false}
          onEnd={onAnimationEnd}
        />
      ) : (
        <></>
      )} */}
    </mesh>
  );
};

export default Card;
