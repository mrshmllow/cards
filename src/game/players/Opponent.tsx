import { useEffect } from "react";
import { Vector3 } from "three";
import { middleOfArray } from "../../math";
import useStore from "../../state";
import { getNextCard } from "../helper";
import OpponentCard from "../card/OpponentCard";
import { CardTypes } from "../../types/cards/card_types";

const Opponent: React.FC<{ number: number }> = ({ number }) => {
  const me = useStore.usePlayers()[number];
  const turn = useStore.useTurn();
  const pickupCard = useStore.usePickupCard();
  const nextTurn = useStore.useNextTurn();
  const placeOnDeck = useStore.usePlaceOnDeck();

  useEffect(() => {
    if (turn === number) {
      setTimeout(() => {
        // ai turn

        const skip = me.cards.findIndex((card) => card.type === CardTypes.skip);

        if (skip !== -1) {
          placeOnDeck(1, skip);
        } else {
          const next = getNextCard();
          pickupCard(turn, next);
        }

        nextTurn();
      }, 1000);
    }
  }, [turn]);

  return (
    <>
      {me.cards.map((card, index) => (
        <OpponentCard
          type={card.type}
          key={index}
          index={index}
          moving={
            new Vector3(
              me.cards.length % 2 === 0
                ? (index - middleOfArray(me.cards)) * 9.5 + 9.5 / 2
                : (index - middleOfArray(me.cards)) * 9.5,
              0,
              -23 * 2
            )
          }
        />
      ))}
    </>
  );
};

export default Opponent;
