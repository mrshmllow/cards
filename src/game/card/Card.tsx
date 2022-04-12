import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import Playlist from "../../animation/Playlist";
import useStore from "../../state";
import { CardTypes } from "../../types/cards/card_types";
import CardGui from "./CardGui";

const Card: React.FC<{
  type: CardTypes;
  moving?: Vector3;
  index: number;
}> = ({ type, moving, index }) => {
  const three = useThree();
  const setTooltip = useStore.useSetTooltip();
  const turn = useStore.useTurn();
  const nextTurn = useStore.useNextTurn();
  const placeOnDeck = useStore.usePlaceOnDeck();
  const addNext = useStore.useAddNext();
  const cards = useStore.usePlayers()[0].cards;
  const ref = useRef();
  const refrence = ref.current as unknown as Group | undefined;
  const [hovering, setHovering] = useState(false);

  useFrame(() => {
    let target: Vector3;

    if (hovering) {
      target = new Vector3(0, 2);
    } else {
      target = new Vector3(0, -2);
    }

    if (moving) {
      target.add(moving);
    }

    refrence!.position.lerp(target, 0.1);
  });

  useEffect(() => {
    if (refrence) {
      if (type !== CardTypes.explosion) {
        if (hovering) {
          refrence.lookAt(three.camera.position);
        } else {
          refrence.rotation.set(0, 0, 0);
        }
        setTooltip("A card", "descriptions wip");
      }
    }
  }, [hovering]);

  useEffect(() => {
    if (refrence) refrence.rotation.set(0, 0, 0);
  }, [cards]);

  return (
    <>
      <group ref={ref}>
        {hovering && <CardGui type={type} />}
        <mesh
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onClick={(event) => {
            event.stopPropagation();

            if (turn === 0) {
              if (type === CardTypes.skip) {
                placeOnDeck(0, index);
                nextTurn();
              } else if (type === CardTypes.future) {
                placeOnDeck(0, index);
                let gen = [];

                for (let i = 0; i < 3; i++) {
                  // gen.push(getNextCard(next).type);
                  gen.push(CardTypes.future);
                }

                addNext(gen);
              }
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
      </group>
    </>
  );
};

export default Card;
