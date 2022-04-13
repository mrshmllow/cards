import { useEffect } from "react";
import { Vector3 } from "three";
import { middleOfArray } from "../../math";
import useStore from "../../state";
import { getNextCard } from "../../helpers/helper";
import OpponentCard from "../card/OpponentCard";
import { CardTypes } from "../../types/cards/card_types";

const Opponent: React.FC<{ number: number }> = ({ number }) => {
  const me = useStore.usePlayers()[number];
  const turn = useStore.useTurn();
  const pickupCard = useStore.usePickupCard();
  const nextTurn = useStore.useNextTurn();
  const placeOnDeck = useStore.usePlaceOnDeck();
  const addNext = useStore.useAddNext();
  const next = useStore.useDeck().next;

  useEffect(() => {
    console.log(
      "known by 2",
      next.filter((card) => card.knownBy?.includes(1))
    );
  }, [next]);

  useEffect(() => {
    if (turn === number) {
      setTimeout(() => {
        // ai turn

        // const knownByMe = next.filter((card) => card.knownBy?.includes(1));

        const skip = me.cards.findIndex((card) => card.type === CardTypes.skip);
        const future = me.cards.findIndex(
          (card) => card.type === CardTypes.future
        );

        if (skip !== -1) {
          placeOnDeck(1, skip);
        } else if (future !== -1) {
          placeOnDeck(1, future);
          addNext(1);
        } else {
          const card = getNextCard(next, 1);
          pickupCard(turn, card);
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
          known={card.knownBy?.includes(0)}
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
