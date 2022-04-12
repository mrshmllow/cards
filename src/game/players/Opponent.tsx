import { useEffect } from "react";
import { Vector3 } from "three";
import { middleOfArray } from "../../math";
import useStore from "../../state";
import { getNextCard } from "../helper";
import OpponentCard from "../card/OpponentCard";

const Opponent: React.FC<{ number: number }> = ({ number }) => {
  const me = useStore.usePlayers()[number];
  const turn = useStore.useTurn();
  const pickupCard = useStore.usePickupCard();
  const nextTurn = useStore.useNextTurn();

  useEffect(() => {
    if (turn === number) {
      setTimeout(() => {
        // ai turn

        if (/* Should pickup */ true) {
          const next = getNextCard();

          pickupCard(turn, next);
        } else {
          // Take cards into account and play a card...
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
