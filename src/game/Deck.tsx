import { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";
import Animation from "../animation/Animation";
import useStore from "../state";
import { getNextCard } from "../helpers/helper";
import { Html } from "@react-three/drei/web/Html";
import pluralize from "pluralize";

const Deck: React.FC<{}> = () => {
  const ref = useRef();
  const setTooltip = useStore.useSetTooltip();
  const pickupCard = useStore.usePickupCard();
  const turn = useStore.useTurn();
  const nextTurn = useStore.useNextTurn();
  const deck = useStore.useDeck();

  useEffect(() => {
    const reference = ref.current as unknown as Group;

    reference.rotation.set(degToRad(-90), 0, 0);
  }, []);

  const onClick = () => {
    if (turn === 0) {
      const card = getNextCard(deck.next, deck.cards, 0);
      pickupCard(turn, card);
      nextTurn();
    }
  };

  return (
    <>
      <group ref={ref}>
        <Html
          className="text-white text-6xl flex flex-col"
          transform
          position={new Vector3(-10, 0, 0)}
        >
          <span>
            {deck.cards} {pluralize("Card", deck.cards)}
          </span>
          <span>
            {deck.explosions} {pluralize("Explosive", deck.explosions)}
          </span>
        </Html>
        <mesh
          onClick={onClick}
          onPointerOver={() =>
            setTooltip("Deck", "Click to pickup a card (Be Careful!)")
          }
          // onPointerLeave={() => clearTooltip()}
        >
          <planeGeometry args={[18 / 2, 25 / 2]} />

          <Animation
            frame={0}
            frames={1}
            resolve={(frame) => `/assets/card/default${frame}.png`}
            loop={false}
            playing={true}
          />
        </mesh>
      </group>
    </>
  );
};

export default Deck;
