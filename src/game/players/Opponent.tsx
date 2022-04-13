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
    if (turn === number) {
      let played: CardTypes[] = [];

      const pickup = () => {
        const card = getNextCard(next, 1);
        pickupCard(turn, card);
      };

      const place = (card: number) => {
        placeOnDeck(1, card);
        played.push(me.cards[card].type);
      };

      const choice = () => {
        setTimeout(() => {
          const skip = me.cards.findIndex(
            (card) => card.type === CardTypes.skip
          );
          const future = me.cards.findIndex(
            (card) => card.type === CardTypes.future
          );

          if (skip !== -1) {
            place(skip);
          } else if (future !== -1 && !played.includes(CardTypes.future)) {
            place(future);
            addNext(1);
            choice();
          } else {
            // Last resort
            pickup();
          }
        }, 1000);
      };

      choice();
      nextTurn();
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
