import { useEffect } from "react";
import { Vector3 } from "three";
import { middleOfArray } from "../../math";
import useStore from "../../state";
import { getNextCard } from "../../helpers/helper";
import OpponentCard from "../card/OpponentCard";
import { CardType } from "../../types/cards/card_type";
import { sleep } from "../../helpers/time";

const Opponent: React.FC<{ number: number }> = ({ number }) => {
  const me = useStore.usePlayers()[number];
  const turn = useStore.useTurn();
  const pickupCard = useStore.usePickupCard();
  const nextTurn = useStore.useNextTurn();
  const placeOnDeck = useStore.usePlaceOnDeck();
  const addNext = useStore.useAddNext();
  const deck = useStore.useDeck();

  useEffect(() => {
    const effect = async () => {
      if (turn === number) {
        let played: CardType[] = [];

        const pickup = () => {
          const card = getNextCard(deck.next, deck.cards, 1);
          pickupCard(turn, card);
        };

        const place = (card: number) => {
          placeOnDeck(1, card);
          played.push(me.cards[card].type);
        };

        const choice = async () => {
          await sleep(1000);

          const skip = me.cards.findIndex(
            (card) => card.type === CardType.skip
          );
          const future = me.cards.findIndex(
            (card) => card.type === CardType.future
          );

          if (skip !== -1) {
            place(skip);
          } else if (future !== -1 && !played.includes(CardType.future)) {
            place(future);
            addNext(1);
            await choice();
          } else {
            // Last resort
            pickup();
          }
        };

        await choice();
        nextTurn();
      }
    };
    effect();
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
              6.3,
              -23
            )
          }
        />
      ))}
    </>
  );
};

export default Opponent;
