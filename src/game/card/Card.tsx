import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import Playlist from "../../animation/Playlist";
import useStore from "../../state";
import cardAnimations from "../../types/cards/card_animations";
import { CardType } from "../../types/cards/card_type";
import CardGui from "./CardGui";

const Card: React.FC<{
  type: CardType;
  known: boolean;
  moving?: Vector3;
  index: number;
  disabled: boolean;
}> = ({ type, moving, index, known, disabled }) => {
  const three = useThree();
  const setTooltip = useStore.useSetTooltip();
  const turn = useStore.useTurn();
  const nextTurn = useStore.useNextTurn();
  const placeOnDeck = useStore.usePlaceOnDeck();
  const addNext = useStore.useAddNext();
  const cards = useStore.usePlayers()[0].cards;
  const ref = useRef(null!);
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
      if (type !== CardType.explosion) {
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
        {hovering && <CardGui type={type} known={known} disabled={disabled} />}
        <mesh
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onClick={(event) => {
            event.stopPropagation();

            if (turn === 0 && !disabled) {
              if (type === CardType.skip) {
                placeOnDeck(0, index);
                nextTurn();
              } else if (type === CardType.future) {
                placeOnDeck(0, index);
                addNext(0);
              }
            }
          }}
          castShadow={true}
        >
          <planeGeometry args={[18 / 2, 25 / 2]} />

          <Playlist
            animations={[
              cardAnimations["unturn"],
              type === CardType.explosion
                ? cardAnimations["explosion"]
                : type === CardType.future
                ? cardAnimations["future"]
                : type === CardType.skip
                ? cardAnimations["skip"]
                : cardAnimations["default"],
            ]}
            loop={false}
            playing={true}
            depthResolve={() => `/assets/card/depth/default0.png`}
            color={disabled ? "grey" : undefined}
          />
        </mesh>
      </group>
    </>
  );
};

export default Card;
