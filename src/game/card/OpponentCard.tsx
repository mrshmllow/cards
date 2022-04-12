import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import Playlist from "../../animation/Playlist";
import useStore from "../../state";
import { CardTypes } from "../../types/cards/card_types";

const OpponentCard: React.FC<{
  type: CardTypes;
  known?: boolean;
  moving?: Vector3;
  index: number;
}> = ({ type, moving, index, known }) => {
  const turn = useStore.useTurn();
  const nextTurn = useStore.useNextTurn();
  const placeOnDeck = useStore.usePlaceOnDeck();
  const ref = useRef();
  const refrence = ref.current as unknown as
    | Mesh<BufferGeometry, Material | Material[]>
    | undefined;

  useFrame(() => {
    if (moving) refrence!.position.lerp(moving, 0.1);
  });

  return (
    <>
      <mesh
        ref={ref}
        onClick={() => {
          if (turn === 0) {
            if (type === CardTypes.skip) {
              placeOnDeck(0, index);
              nextTurn();
            }
          }
        }}
      >
        <planeGeometry args={[18 / 2, 25 / 2]} />

        <Playlist
          animations={[
            known
              ? type === CardTypes.explosion
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
    </>
  );
};

export default OpponentCard;
