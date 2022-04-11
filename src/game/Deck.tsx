import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils";
import Animation from "../animation/Animation";
import useStore, { ICard } from "../state";
import cardChances from "../types/cards/card_chances";
import { CardTypes } from "../types/cards/card_types";

const Deck: React.FC<{}> = () => {
  const ref = useRef();
  const setTooltip = useStore.useSetTooltip();
  const clearTooltip = useStore.useClearTooltip();
  const pickupCard = useStore.usePickupCard();
  const cards = useStore.useDeck().cards;
  const decrementCards = useStore.useDecrementDeck();
  const decrementExplosions = useStore.useDecrementExplosions();
  const players = useStore.usePlayers();
  const turn = useStore.useTurn();

  useEffect(() => {
    const reference = ref.current as unknown as Mesh<
      BufferGeometry,
      Material | Material[]
    >;

    reference.rotation.set(degToRad(-90), 0, 0);
  }, []);

  const getNextCard = (players: number): ICard => {
    let num = Math.floor(Math.random() * cards + 1);

    if (num <= players) {
      decrementCards();
      decrementExplosions();

      return {
        type: CardTypes.explosion,
      };
    } else {
      const weights: number[] = [];

      for (let i = 0; i < cardChances.length; i++) {
        const value = cardChances[i];

        weights[i] = value.chance + (weights[i - 1] || 0);
      }

      const random = Math.random() * weights[weights.length - 1];

      for (let i = 0; i < cardChances.length; i++) {
        const value = cardChances[i];

        if (weights[i] > random) {
          return {
            type: value.cards[
              Math.floor(Math.random() * value.cards.length)
            ] as CardTypes,
          };
        }
      }

      decrementCards();
      console.warn(
        "There is something wrong with time and space. Gave a future card as a fallback!!"
      );
      return {
        type: CardTypes.future,
      };
    }
  };

  const onClick = () => {
    const next = getNextCard(players.length);
    console.log(next);
    pickupCard(turn, next);
  };

  return (
    <mesh
      ref={ref}
      onClick={onClick}
      onPointerOver={() => setTooltip("Deck", "Text")}
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
  );
};

export default Deck;
